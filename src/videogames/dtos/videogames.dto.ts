import { PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVideogameDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: string;

  @IsString()
  @IsNotEmpty()
  readonly platform: string[];
}
export class UpdateVideogameDto extends PartialType(CreateVideogameDto) {
  @IsMongoId()
  @IsNotEmpty()
  readonly videogameId: string;
}
