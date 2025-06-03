import { PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateVideogameDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly platform: string[];
}
export class UpdateVideogameDto extends PartialType(CreateVideogameDto) {
  @IsMongoId()
  @IsNotEmpty()
  readonly videogameId: string;
}
