import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/database/entities/category.entity';
import { Product } from 'src/database/entities/product.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('products').exec();
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async updateCategoryProduct(category: Category, product: Product) {
    const update = await this.categoryModel.findByIdAndUpdate(category._id, {
      $push: { products: product._id },
    });
    return update;
  }
}
