import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CategorieDto } from 'src/database/dto/category.dto';
import { Category } from 'src/database/entities/category.entity';
import { Product } from 'src/database/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('products').exec();
  }

  async findById(id: string): Promise<Category> {
    const objectId = new Types.ObjectId(id);
    const category = await this.categoryModel.findById(objectId);
    if (!category) {
      Logger.warn(`Catégorie non trouvée pour l'ID : ${id}`);
      throw new BadRequestException('Category not found.');
    }
    return category
  }

  async updateCategoryProduct(category: Category, product: Product) {
    const update = await this.categoryModel.findByIdAndUpdate(category._id, {
      $addToSet: { products: new Types.ObjectId(product._id) },
    });
    return update;
  }

  async unlinkCategoryProduct(category: Category, product: Product) {
    const update = await this.categoryModel.findByIdAndUpdate(category._id, {
      $pull: { products: new Types.ObjectId(product._id)},
    });
    return update;
  }

  async update(categoryDto: CategorieDto): Promise<Category>{
    const categoryId = new Types.ObjectId(categoryDto._id)
    const update = await this.categoryModel.findByIdAndUpdate(categoryId, {
      $set: {name: categoryDto.name, isDeleted: categoryDto.isDeleted}
    })
    return update;
  }
}
