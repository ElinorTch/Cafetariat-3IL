import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class BaseEntity {
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @Prop({ default: () => new Date(), immutable: true })
  readonly createdAt: Date;

  @Prop({ default: () => new Date() })
  readonly updatedAt: Date;

  @Prop()
  deletedAt: Date;
}
