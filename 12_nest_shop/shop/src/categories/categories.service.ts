import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService){

  }

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where: {name: createCategoryDto.name}
    })
    if(exists) throw new ConflictException(`${createCategoryDto.name}는(은) 이미 등록된 카테고리입니다`);
    return this.prisma.category.create({data: createCategoryDto});
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: {id: 'asc'}
    });
  }

  findOne(id: number) {
    const category = this.prisma.category.findUnique({
      where: {id}
    })
    if(!category) throw new NotFoundException(`카테고리 아이디 ${id} 찾을 수 없습니다`)
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    if(updateCategoryDto.name !== undefined){
      const exists = await this.prisma.category.findUnique({
        where: {name: updateCategoryDto.name}
      })
      if(exists && exists.id !== id){
        throw new ConflictException(`${updateCategoryDto.name} 이미 있는 카테고리입니다`)
      }
    }
    return await this.prisma.category.update({where: {id}, data: updateCategoryDto});
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.category.delete({where: {id}});
    return {deleted: id};
  }
}
