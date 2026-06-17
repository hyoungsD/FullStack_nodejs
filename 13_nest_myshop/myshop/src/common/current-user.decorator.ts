import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Role } from "@prisma/client";

export interface AuthUser {
  id: number;
  email: string;
  role: Role; // from prisma/client, BUYER | SELLER
}


// decorator 만들기
export const CurrentUser = createParamDecorator((
  field: keyof AuthUser, // id, email, role
  ctx: ExecutionContext // nestjs에서 제공하는 요청 컨텍스트, httpRequest를 가져올 수 있다.
) => {
  // Http 요청 객체(req)를 꺼낸다. from NESTJS 요청 컨텍스트에서
  const request = ctx.switchToHttp().getRequest();
  // JWTStrategy.validate 가 채워둔 사용자 정보를 꺼낸다
  const user: AuthUser = request.user;
  // field가 있으면 한 필드만, 없으면 객체 전체 반환
  // @CurrentUser("id") --> user.id
  // @CurrentUser()     --> user (전체)
  return field ? user?.[field] : user;
})

