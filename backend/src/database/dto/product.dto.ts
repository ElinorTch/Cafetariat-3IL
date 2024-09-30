import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsOptional()
    _id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;
}
