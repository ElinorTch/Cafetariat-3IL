import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';
import { Reservation } from './reservation.entity';
import { Statut } from '../enum/statut';

export type CategoryDocument = HydratedDocument<ReservationItem>;

@Schema({ timestamps: true })
export class ReservationItem extends BaseEntity {
  @Prop({ required: true, unique: false })
  quantity: string;

  @Prop({ required: true, unique: false })
  total: string;

  @Prop({ required: true, unique: true })
  status: Statut;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' })
  Reservation: Reservation;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product;
}

export const CategorySchema = SchemaFactory.createForClass(ReservationItem);
