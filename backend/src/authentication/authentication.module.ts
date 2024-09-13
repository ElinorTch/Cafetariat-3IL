import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cafet3IL'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthenticationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthenticationModule {}
