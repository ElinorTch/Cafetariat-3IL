import { Controller, Post, Body, Get, Query } from '@nestjs/common';
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

  @Get()
  async getAll(
    @Query() filters: { [key: string]: string },
  ): Promise<Reservation[]> {
    return this.reservationService.findAll(filters);
  }
}
