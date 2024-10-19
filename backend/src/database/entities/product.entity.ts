/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.entity';
import { BaseEntity } from './base.entity';
import { ReservationItem } from './reservationItem.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product extends BaseEntity {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({required: false })
  imagePath: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReservationItem' }],
  })
  reservationItem: ReservationItem[];

  @Prop({required: false})
  disponibilityDays: number[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
