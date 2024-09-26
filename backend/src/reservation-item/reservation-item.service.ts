import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';
import { ReservationItemDto } from 'src/database/dto/reservationItem.dto';
import { Reservation } from 'src/database/entities/reservation.entity';
import { ReservationItem } from 'src/database/entities/reservationItem.entity';

@Injectable()
export class ReservationItemService {
  constructor(
    @InjectModel(ReservationItem.name)
    private reservationItemModel: Model<ReservationItem>,
    private auth: AuthService,
  ) {}

  async create(reservationItemDto: ReservationItemDto) {
    const reservationItem = new this.reservationItemModel(reservationItemDto);
    // const category = await this.categoryService.findById(productDto.categoryId);
    // product.category = category; // Utilser les produits plutot
    const savedItem = await reservationItem.save();
    // this.categoryService.updateCategoryProduct(category, savedProduct);
    return savedItem;
  }

  async findAll(filters?: {
    [key: string]: string;
  }): Promise<ReservationItem[]> {
    return this.reservationItemModel.find().populate('reservationItem').exec();
  }
}
