import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  ExecutionContext,
  Request,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../database/entities/user.entity';
import { UserDto } from '../database/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import * as req from 'express';
import { Reservation } from 'src/database/entities/reservation.entity';

@Injectable()
export class AuthService {
  private user: User | null = null;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  me(@Request() req: any) {
    return req.user;
  }

  async signUp(userDto: UserDto): Promise<{ token: string }> {
    const user = new this.userModel(userDto);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    user.password = hash;
    user.save();

    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(userDto: UserDto): Promise<{ token: string }> {
    const user = await this.getByEMail(userDto.email);
    const isMatch = await bcrypt.compare(userDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async isAuthenticated(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      this.user = await this.getById(payload.sub);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: req.Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  getUser(): User | null {
    return this.user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) throw new BadRequestException("This user doesn't exist.");
    return user;
  }

  async getByEMail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new BadRequestException("This user doesn't exist.");
    return user;
  }

  async update(userDto: UserDto): Promise<User>{
    const user = this.getByEMail(userDto.email);
    const update = await this.userModel.findByIdAndUpdate((await user)._id, {
      $set: {email: userDto.email, password: userDto.password}
    })
    return update;
  }
}
