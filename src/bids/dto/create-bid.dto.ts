import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    description: 'user Id of user',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Amount of bid',
    example: 2000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
