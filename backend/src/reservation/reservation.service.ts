import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';
import { Reservation } from 'src/database/entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    private auth: AuthService,
  ) {}

  async create(reservationDto: ReservationDto) {
    const reservation = new this.reservationModel(reservationDto);
    console.log(reservationDto);
    console.log(reservation);
    // const category = await this.categoryService.findById(productDto.categoryId);
    // product.category = category; // Utilser les produits plutot
    const savedReservation = await reservation.save();
    // this.categoryService.updateCategoryProduct(category, savedProduct);
    return savedReservation;
  }

  async findAll(filters?: { [key: string]: string }): Promise<Reservation[]> {
    if (filters) {
      if (filters['status'])
        return this.reservationModel
          .find({ status: filters['status'] })
          .populate('reservationItem')
          .exec();
    }

    return this.reservationModel.find().populate('reservationItem').exec();
  }
}
