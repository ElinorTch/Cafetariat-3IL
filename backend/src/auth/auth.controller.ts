import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { AuthService } from './auth.service';
import { UserDto } from 'src/database/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
