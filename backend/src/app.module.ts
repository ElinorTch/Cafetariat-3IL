import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationItemModule } from './reservation-item/reservation-item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cafet3IL'),
    AuthModule,
    ProductModule,
    CategoryModule,
    ReservationModule,
    ReservationItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
