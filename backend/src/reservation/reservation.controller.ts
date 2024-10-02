import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  Param,
} from '@nestjs/common';
import { Reservation } from 'src/database/entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationDto } from 'src/database/dto/reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservationDto: ReservationDto) {
    return this.reservationService.create(reservationDto);
  }

  @Post(':id')
  async updateStatus(
    @Request() req: any,
    @Param('id') id: string,
    @Query() filters: { [key: string]: string },
  ) {
    return this.reservationService.updateStatus(req, id, filters);
  }

  @Get()
  async getAll(
    @Request() req: any,
    @Query() filters: { [key: string]: string },
  ): Promise<Reservation[]> {
    return this.reservationService.findAll(req, filters);
  }
}
