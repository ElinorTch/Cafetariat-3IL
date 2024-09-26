import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';
import { ReservationItem } from './reservationItem.entity';
import { Statut } from '../enum/statut';

export type CategoryDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation extends BaseEntity {
  @Prop({ required: true, unique: true })
  status: Statut;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReservationItem' }],
  })
  reservationItem: ReservationItem[];
}

export const CategorySchema = SchemaFactory.createForClass(Reservation);
