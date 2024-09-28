import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseEntity } from './base.entity';
import { Role } from '../enum/role';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
