import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { ProductDto } from 'src/database/dto/product.dto';
import { Product } from 'src/database/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoryService: CategoryService,
  ) {}

  async create(productDto: ProductDto): Promise<Product> {
    const product = new this.productModel(productDto);
    const category = await this.categoryService.findById(productDto.categoryId);
    product.category = category;
    const savedProduct = await product.save();
    this.categoryService.updateCategoryProduct(category, savedProduct);
    return savedProduct;
  }

  async getById(id: string): Promise<Product> {
    const product = this.productModel.findById({ _id: id });
    if (!product) throw new BadRequestException("This product doesn't exist.");
    return product;
  }
}
