import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateTripDto {
  id?: number;

  @ApiProperty({
    description: 'tanggal mulai perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: true,
    type: String,
    format: 'date',
  })
  @IsDateString()
  tanggalMulaiPerjalanan: Date;

  @ApiProperty({
    description: 'tanggal akhir perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: true,
    type: String,
    format: 'date',
  })
  @IsDateString()
  tanggalAkhirPerjalanan: Date;

  @ApiProperty({
    description: 'destinasi perjalanan',
    example: 'Jakarta',
    required: true,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  destinasiPerjalanan: string;
}
