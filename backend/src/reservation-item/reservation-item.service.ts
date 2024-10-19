import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';
import { ReservationItemDto } from 'src/database/dto/reservationItem.dto';
import { Reservation } from 'src/database/entities/reservation.entity';
import { ReservationItem } from 'src/database/entities/reservationItem.entity';
import { Status } from 'src/database/enum/status';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReservationItemService {
  constructor(
    @InjectModel(ReservationItem.name)
    private reservationItemModel: Model<ReservationItem>,
    private productService: ProductService,
    private authService: AuthService,
  ) {}

  async create(reservationItemDto: ReservationItemDto) {
    const reservationItem = new this.reservationItemModel(reservationItemDto);
    const product = await this.productService.getById(
      reservationItemDto.productId,
    );
    const user = await this.authService.getById(reservationItemDto.userId);
    reservationItem.products = product;
    reservationItem.total = product.price * reservationItem.quantity;
    reservationItem.user = user;
    const savedItem = await reservationItem.save();
    return savedItem;
  }

  async updateStatus(id: string) {
    const reservationItem = await this.getById(id);
    reservationItem.status = Status.COMPLETED;
    reservationItem.save();
  }

  async findAll(filters?: {
    [key: string]: string;
  }): Promise<ReservationItem[]> {
    return this.reservationItemModel.find();
  }

  async findByUser(userId: string) {
    return this.reservationItemModel
      .find({ user: userId, status: 'pending' })
      .populate('products')
      .exec();
  }

  async getById(id: string) {
    return this.reservationItemModel
      .findById({ _id: id })
      .populate('products')
      .exec();
  }
}
