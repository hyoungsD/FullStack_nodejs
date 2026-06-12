import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService
  ){}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.createMany({
      data: createProductDto
    });
  }

  async findAll(query: QueryProductDto) {
    const {page, limit} = query;
    // Promise.all : 동시에 실행해서 가져옴
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit, // offset
        take: limit,  // limit
        orderBy: {id: 'desc'}
      }),
      this.prisma.product.count() // SELECT COUNT(*) FROM products
    ])
    return {items, total, page, limit, totalPage: Math.ceil(total/limit)};
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({where: {id: id}});
    if(!product) throw new NotAcceptableException(`상품 ${id}를 찾을 수 없습니다`)
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
