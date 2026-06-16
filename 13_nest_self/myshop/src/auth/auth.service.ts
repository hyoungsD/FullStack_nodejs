import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async register(dto: RegisterDto){
    // 기존 유저 체크
    const exists = await this.userService.findByEmail(dto.email);
    if(exists) throw new ConflictException(`이미 가입된 이메일입니다`);
    // 비밀번호 암호화
    const hashed = await bcrypt.hash(dto.password, 10);
    // 유저 생성
    const user = await this.userService.createUser({
      email: dto.email,
      name: dto.name,
      password: hashed,
      role: dto.role ?? 'BUYER'
    });
    // 비밀번호 빼고 나머지 데이터 반환 
    const {password, ...result} = await user;
    return result;
  }

  async login(dto: LoginDto){
    const user = await this.userService.findByEmail(dto.email);
    const isRight = await bcrypt.compare(dto.password, user!.password);
    if(!user || !isRight) {
      throw new UnauthorizedException(`이메일 또는 비밀번호가 다릅니다`)
    }
    const payload = {
      sub: user.id, email: user.email, role: user.role
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
