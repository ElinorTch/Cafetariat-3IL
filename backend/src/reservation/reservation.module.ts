import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { Product, ProductSchema } from 'src/database/entities/product.entity';
import {
  Reservation,
  ReservationSchema,
} from 'src/database/entities/reservation.entity';
import {
  ReservationItem,
  ReservationItemSchema,
} from 'src/database/entities/reservationItem.entity';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/database/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { ReservationItemService } from 'src/reservation-item/reservation-item.service';
import { ReservationItemModule } from 'src/reservation-item/reservation-item.module';
import { ProductModule } from 'src/product/product.module';
import {
  Category,
  CategorySchema,
} from 'src/database/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: ReservationItem.name, schema: ReservationItemSchema },
    ]),
    ReservationItemModule,
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    AuthService,
    ReservationItemService,
    ProductService,
    CategoryService,
  ],
})
export class ReservationModule {}
