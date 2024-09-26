import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from './base.entity';
import { Role } from '../enum/role';
import { Reservation } from './reservation.entity';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: Role;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  })
  reservation: Reservation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
