import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 앱 전역에서 다 쓸 수 있어
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
