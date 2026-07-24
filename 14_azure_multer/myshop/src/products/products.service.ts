import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/current-user.decorator';
import { UPLOAD_DIR } from '../common/upload.config';
import { AzureBlobService } from '../azure/azure-blob/azure-blob.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly azureBlob: AzureBlobService,
  ){}

  async create(createProductDto: CreateProductDto, sellerId: number) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        sellerId: sellerId, // dto에서 받은 req.user.id : 로그인된 객체의 유저 id
        // M:N -> [1,2,3]
        // connect : 새 프로덕트가 들어오면, product insert 새로 하고,
        //           기존 카테고리에 연결해줘(connect)라는 의미
        // (id) => ({id})
        //   connect : [{id: 1}, {id: 2}]
        //   (id) => ({id}) {id: 1}
        categories: {
          connect: createProductDto.categoryIds.map((id) => ({
            id,
          })),
        },
      }
    });
  }

  async findAll() {
    // return await this.prisma.product.findMany({
    //   include: {
    //     seller: true, categories: true
    //   }
    // });
    return await this.prisma.product.findMany({
      include: {
        seller: {
          select: {id: true, name: true}
        },
        categories: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {id},
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        // set : 이 상품 분류 연결을 전달해준 목록으로 전부 다시 정해라
        //       기존 연결된 목록에 없는 것은 중간테이블 삭제
        //       목록에 있는 것 -> 이미 연결되어 있으면 유지, 없으면 insert
        //       기존 [1,2] -> 신규 [2,3]  : 1은 지우고, 2는 그대로 두고, 3은 연결 추가
        ...( updateProductDto.categoryIds ? {
          categories: { set: updateProductDto.categoryIds.map((cid)=> ({id: cid}))}
        } : {})
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // 이미지 파일 추가
  async addImage(productId: number, user: AuthUser, file: Express.Multer.File){
    const product = await this.prisma.product.findUnique({
      where: {id: productId},
      select: {id: true, sellerId: true}
    });

    const {blobName, url} = await this.azureBlob.uploadPublic(file, 'products');

    const image = await this.prisma.productImage.create({
      // data: {productId, storedName: file.filename}
      data: {productId, storedName: blobName}
    });
    // return {id: image.id, url: `${UPLOAD_DIR}/${image.storedName}`}
    return {id: image.id, url, blobName}
  }
}
