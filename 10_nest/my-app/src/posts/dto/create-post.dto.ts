import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  // 게시글이 생성됐을 때 받는 값

  @IsString({message: 'title은 string 타입을 입력 해줘야합니다.'})
  @MinLength(1) // 최소 글자 1개
  title: string;

  @IsString()
  @MinLength(10) 
  content: string;

  @IsOptional()
  @IsString()
  author?: string;
}
