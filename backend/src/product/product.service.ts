import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { CategorieDto } from 'src/database/dto/category.dto';
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
    const category = await this.categoryService.findById(productDto.category);
    product.category = category;
    const savedProduct = await product.save();
    this.categoryService.updateCategoryProduct(category, savedProduct);
    return savedProduct;
  }

  async update(productDto: ProductDto): Promise<Product> {
    const productId = new Types.ObjectId(productDto._id)
    const product = await this.getById(productDto._id);
    const category = await this.categoryService.findById(productDto.category);
    let update;
    if(product.category == category){
      update = await this.productModel.findByIdAndUpdate(productId, {
        $set: {name: productDto.name, price: productDto.price, isDeleted: productDto.isDeleted}
      })
    }else{
      update = await this.productModel.findByIdAndUpdate(productId, {
        $set: {name: productDto.name, price: productDto.price, category: category, isDeleted: productDto.isDeleted}
      })
      this.categoryService.updateCategoryProduct(category, product);
      this.categoryService.unlinkCategoryProduct(product.category, product);
    }
    return update;

  }

  async getById(id: string): Promise<Product> {
    const product = this.productModel.findById(id);
    if (!product) throw new BadRequestException("This product doesn't exist.");
    return product;
  }

  async getAll(categoryDto: CategorieDto): Promise<Product[]>{
    const products = await this.productModel.find({category: categoryDto._id});
    return products;
  }
}