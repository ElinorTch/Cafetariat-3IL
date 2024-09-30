import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsOptional()
    _id: string;

  @IsBoolean()
  isDeleted: boolean

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;
}
