import { IsOptional, IsString } from 'class-validator';
import { ReservationItem } from '../entities/reservationItem.entity';

export class ReservationDto {
  @IsString()
  @IsOptional()
  userId: string;

  reservationItem: ReservationItem[];

  @IsString()
  status: string;
}
