import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [CategoriesModule],  // category 임포트
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
