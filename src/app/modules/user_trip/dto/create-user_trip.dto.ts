import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserTripDto {
  id?: number;

  @ApiProperty({
    description: 'user id',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'trip id',
    example: 1,
  })
  @IsNumber()
  tripId: number;
}
