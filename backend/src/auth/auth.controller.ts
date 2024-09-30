import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { AuthService } from './auth.service';
import { UserDto } from 'src/database/dto/user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/database/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Public()
  @Post('signup')
  async create(@Body() userDto: UserDto): Promise<{ token: string }> {
    return this.usersService.signUp(userDto);
  }

  @Public()
  @Post('signin')
  async login(@Body() userDto: UserDto): Promise<{ token: string }> {
    return this.usersService.signIn(userDto);
  }

  @Get('me')
  me(@Request() req: any) {
    return this.usersService.me(req);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put()
  async update(@Body() userDto: UserDto): Promise<User>{
    return this.usersService.update(userDto);
  }
}
