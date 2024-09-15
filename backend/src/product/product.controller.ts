import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { ProductService } from './product.service';
import { ProductDto } from 'src/database/dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    return this.productsService.create(productDto);
  }
}
