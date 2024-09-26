import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from './base.entity';
import { ReservationItem } from './reservationItem.entity';
import { Status } from '../enum/status';
import { User } from './user.entity';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation extends BaseEntity {
  @Prop({ required: true, default: 'pending', unique: false })
  status: Status;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReservationItem' }],
  })
  reservationItem: ReservationItem[];

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  user: User;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
