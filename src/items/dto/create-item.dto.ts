import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Laptop',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'Sleek and powerfull',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Starting Price of Item',
    example: 1000,
  })
  @IsNotEmpty()
  @IsNumber()
  startingPrice: number;

  @ApiProperty({
    description: 'The duration of id in seconds',
    example: 3600,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'User ID of the person creating the item',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
