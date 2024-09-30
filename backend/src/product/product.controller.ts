import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { ProductService } from './product.service';
import { ProductDto } from 'src/database/dto/product.dto';
import { CategorieDto } from 'src/database/dto/category.dto';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    return this.productsService.create(productDto);
  }

  @Put()
  async update(@Body() productDto: ProductDto): Promise<Product> {
    return this.productsService.update(productDto);
  }

  @Get()
  async getAll(@Body() categoryDto: CategorieDto): Promise<Product[]> {
    return this.productsService.getAll(categoryDto);
  }
}
