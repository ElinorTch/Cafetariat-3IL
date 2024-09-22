import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../database/entities/user.entity';
import { UserDto } from '../database/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<{ token: string }> {
    const user = new this.userModel(userDto);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    user.password = hash;
    user.save();

    const payload = { sub: user._id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(userDto: UserDto): Promise<{ token: string }> {
    const user = await this.getByEMail(userDto.email);
    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const payload = { sub: user._id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    const user = this.userModel.findById({ id });
    if (!user) throw new BadRequestException("This user doesn't exist.");
    return user;
  }

  async getByEMail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new BadRequestException("This user doesn't exist.");
    return user;
  }
}
