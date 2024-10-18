import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';
import { Reservation } from './reservation.entity';
import { Status } from '../enum/status';
import { User } from './user.entity';

export type ReservationItemDocument = HydratedDocument<ReservationItem>;

@Schema({ timestamps: true })
export class ReservationItem extends BaseEntity {
  @Prop({ required: true, unique: false })
  quantity: number;

  @Prop({ required: false, unique: false })
  total: number;

  @Prop({ required: true, unique: false, default: 'pending' })
  status: Status;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' })
  Reservation: Reservation;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ReservationItemSchema =
  SchemaFactory.createForClass(ReservationItem);
