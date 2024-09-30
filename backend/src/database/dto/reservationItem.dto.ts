import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationItemDto {
  @IsString()
  @IsOptional()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  status: string;
}
