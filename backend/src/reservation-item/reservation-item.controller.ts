import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ReservationItemService } from './reservation-item.service';
import { ReservationItem } from 'src/database/entities/reservationItem.entity';
import { ReservationItemDto } from 'src/database/dto/reservationItem.dto';

@Controller('reservationsItem')
export class ReservationItemController {
  constructor(private reservationItemService: ReservationItemService) {}

  @Post()
  async create(@Body() reservationItemDto: ReservationItemDto) {
    return this.reservationItemService.create(reservationItemDto);
  }

  @Get()
  async getAll(
    @Query() filters: { [key: string]: string },
  ): Promise<ReservationItem[]> {
    return this.reservationItemService.findAll(filters);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ReservationItem> {
    return this.reservationItemService.getById(id);
  }
}
