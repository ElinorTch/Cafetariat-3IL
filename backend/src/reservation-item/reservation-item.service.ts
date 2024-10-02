import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';
import { ReservationItemDto } from 'src/database/dto/reservationItem.dto';
import { Reservation } from 'src/database/entities/reservation.entity';
import { ReservationItem } from 'src/database/entities/reservationItem.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReservationItemService {
  constructor(
    @InjectModel(ReservationItem.name)
    private reservationItemModel: Model<ReservationItem>,
    private productService: ProductService,
  ) {}

  async create(reservationItemDto: ReservationItemDto) {
    const reservationItem = new this.reservationItemModel(reservationItemDto);
    const product = await this.productService.getById(
      reservationItemDto.productId,
    );
    reservationItem.products = product;
    reservationItem.total = product.price * reservationItem.quantity;
    // product.category = category; // Utilser les produits plutot
    const savedItem = await reservationItem.save();
    // this.categoryService.updateCategoryProduct(category, savedProduct);
    return savedItem;
  }

  async findAll(filters?: {
    [key: string]: string;
  }): Promise<ReservationItem[]> {
    return this.reservationItemModel.find();
  }

  async getById(id: string): Promise<ReservationItem> {
    return this.reservationItemModel
      .findById({ _id: id })
      .populate('products')
      .exec();
  }
}
