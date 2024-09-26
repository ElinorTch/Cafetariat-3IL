import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import {
  Reservation,
  ReservationSchema,
} from 'src/database/entities/reservation.entity';
import {
  ReservationItem,
  ReservationItemSchema,
} from 'src/database/entities/reservationItem.entity';
import { User, UserSchema } from 'src/database/entities/user.entity';
import { ReservationItemController } from './reservation-item.controller';
import { ReservationItemService } from './reservation-item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    MongooseModule.forFeature([
      { name: ReservationItem.name, schema: ReservationItemSchema },
    ]),
    AuthModule,
  ],
  controllers: [ReservationItemController],
  providers: [ReservationItemService, AuthService],
})
export class ReservationItemModule {}
