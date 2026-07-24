import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: '홍길동'})
  @IsString()
  name: string;

  @ApiProperty({example: 'admin@example.com'})
  @IsEmail() 
  @MinLength(2)
  email: string

}
