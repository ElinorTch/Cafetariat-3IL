import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { ProductService } from './product.service';
import { ProductDto } from 'src/database/dto/product.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/',
      filename: (req, file, cb) => {
        
        const randomName = Array(32)
          .fill(null)
          .map(() => (Math.round(Math.random() * 16)).toString(16))
          .join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() productData: any): Promise<Product> {
    let imagePath;


  if (file) {
    imagePath = `uploads/${file.filename}`;
    productData.imagePath = `http://localhost:3000/${imagePath}`;
  } else {

    productData.imagePath = null; 
  }

  if (typeof productData.disponibilityDays === 'string') {
    productData.disponibilityDays = JSON.parse(productData.disponibilityDays);
  }

  const createdProduct = await this.productsService.create(productData);

  return {
    ...createdProduct,
    imagePath: productData.imagePath,
  };
  }

  @Put()
  async update(@Body() productDto: ProductDto): Promise<Product> {
    return this.productsService.update(productDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }
}
