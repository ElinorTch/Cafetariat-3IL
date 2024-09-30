/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CategorieDto {
  @IsString()
  @IsOptional()
    _id: string;

  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  products: string[];
}
