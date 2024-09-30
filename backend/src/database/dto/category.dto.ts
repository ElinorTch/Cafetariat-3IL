/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CategorieDto {
  @IsString()
  @IsOptional()
    _id: string;

  @IsBoolean()
  isDeleted: boolean;

  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  products: string[];
}
