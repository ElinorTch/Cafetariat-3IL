import { IsOptional, IsString } from 'class-validator';

export class ReservationDto {
  @IsString()
  @IsOptional()
  productId: string;

  @IsString()
  status: string;
}
