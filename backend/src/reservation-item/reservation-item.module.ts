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
import { Product, ProductSchema } from 'src/database/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import {
  Category,
  CategorySchema,
} from 'src/database/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: ReservationItem.name, schema: ReservationItemSchema },
    ]),
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [ReservationItemController],
  providers: [ReservationItemService, AuthService, ProductService],
})
export class ReservationItemModule {}
