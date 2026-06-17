import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.prisma.user.findUnique({
      where: {email: createUserDto.email}
    })
    if(exist){
      throw new ConflictException(`이미 가입한 이메일입니다`)
    }
    return this.prisma.user.create({data: createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany({orderBy: {createdAt: 'asc'}});
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({where: {id}});
    if(!user) throw new NotFoundException(`사용자 아이디 ${id} 찾을 수 없습니다`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return await this.prisma.user.update({where: {id}, data: updateUserDto});
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({where: {id}});
    return {deleted: id};
  }


  // 회원가입 시 사용 목적
  async createUser(data: {email: string, name: string, password: string, role: Role}){
    return this.prisma.user.create({data})
  }

  // 로그인 시 사용 목적
  async findByEmail(email: string){
    return this.prisma.user.findUnique({where: {email}})
  }
}
