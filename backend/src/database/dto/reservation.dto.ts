import { IsOptional, IsString } from 'class-validator';

export class ReservationDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  status: string;
}
