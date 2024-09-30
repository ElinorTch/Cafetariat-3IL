import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';
import { Reservation } from 'src/database/entities/reservation.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    private auth: AuthService,
  ) {}

  async create(reservationDto: ReservationDto) {
    const reservation = new this.reservationModel(reservationDto);
    const user = await this.auth.getById(reservationDto.userId);
    reservation.user = user;
    return reservation.save();
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
