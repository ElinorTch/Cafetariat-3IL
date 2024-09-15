import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/database/entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import {
  Category,
  CategorySchema,
} from 'src/database/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
