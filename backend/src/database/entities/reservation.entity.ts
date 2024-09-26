import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from './base.entity';
import { ReservationItem } from './reservationItem.entity';
import { Status } from '../enum/status';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation extends BaseEntity {
  @Prop({ required: true })
  status: Status;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReservationItem' }],
  })
  reservationItem: ReservationItem[];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
