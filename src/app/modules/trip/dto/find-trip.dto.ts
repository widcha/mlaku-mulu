import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindTripDto {
  @ApiPropertyOptional({
    description: 'tanggal mulai perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: false,
    type: String,
    format: 'date',
  })
  @IsOptional()
  tanggalMulaiPerjalanan?: Date;

  @ApiPropertyOptional({
    description: 'tanggal akhir perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: false,
    type: String,
    format: 'date',
  })
  @IsOptional()
  tanggalAkhirPerjalanan?: Date;

  @ApiPropertyOptional({
    description: 'destinasi perjalanan',
    example: 'Jakarta',
    required: false,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  destinasiPerjalanan?: string;
}
