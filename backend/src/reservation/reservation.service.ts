import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';
import { Reservation } from 'src/database/entities/reservation.entity';
import { User } from 'src/database/entities/user.entity';
import { Status } from 'src/database/enum/status';

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

  async findById(id: string) {
    return this.reservationModel.findById({ _id: id });
  }

  async findAll(
    @Request() req: any,
    filters?: { [key: string]: string },
  ): Promise<Reservation[]> {
    const user = req.user;

    if (user.role == 'admin') {
      if (filters) {
        if (filters['status'])
          return this.reservationModel
            .find({ status: filters['status'] })
            .populate('reservationItem')
            .exec();
      }
    } else {
      if (filters) {
        if (filters['status'])
          return this.reservationModel
            .find({ status: filters['status'], user: user.sub })
            .populate('reservationItem')
            .exec();
      }
    }

    return user.role == 'admin'
      ? this.reservationModel.find().populate('reservationItem').exec()
      : this.reservationModel
          .find({ user: user.sub })
          .populate('reservationItem')
          .exec();
  }

  async updateStatus(
    @Request() req: any,
    id: string,
    filters?: { [key: string]: string },
  ): Promise<Reservation> {
    const user = req.user;
    const reservation = await this.findById(id);

    if (user.role == 'admin') {
      if (filters) {
        if (filters['status'])
          reservation.status =
            Status.PENDING == filters['status']
              ? Status.PENDING
              : Status.COMPLETED == filters['status']
                ? Status.COMPLETED
                : Status.CANCELED;
      }
    }

    return reservation.save();
  }
}
