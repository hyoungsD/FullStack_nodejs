import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";


export class RegisterDto {
  
  @ApiProperty({example: 'seller@demo.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'secret123'})
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({example: '판매자'})
  @IsString()
  @MinLength(2)
  name: string

  @ApiProperty({enum: ['BUYER', 'SELLER'], default: 'BUYER'})
  @IsOptional()
  @IsIn(['BUYER', 'SELLER'])
  role?: 'BUYER' | 'SELLER'

}

