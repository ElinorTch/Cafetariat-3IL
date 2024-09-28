import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: string;

  @IsString()
  categoryId: string;
}
