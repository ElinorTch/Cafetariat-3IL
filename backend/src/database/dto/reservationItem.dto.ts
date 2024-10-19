import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationItemDto {
  @IsString()
  productId: string;

  @IsString()
  userId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  status: string;
}
