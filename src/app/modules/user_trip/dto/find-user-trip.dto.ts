import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserTripDto {
  @ApiPropertyOptional({
    description: 'user id',
    example: 1,
    required: false,
    type: Number,
  })
  userId?: number;

  @ApiPropertyOptional({
    description: 'destinasi perjalanan',
    example: 'Jakarta',
    required: true,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
  })
  destinasiPerjalanan?: string;

  @ApiPropertyOptional({
    description: 'tanggal mulai perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: true,
    type: String,
    format: 'date',
  })
  tanggalMulaiPerjalanan?: Date;

  @ApiPropertyOptional({
    description: 'tanggal akhir perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: true,
    type: String,
    format: 'date',
  })
  tanggalAkhirPerjalanan?: Date;
}

export class ResultFindUserTrip {
  id: number;
  tripId: number;
  destinasiPerjalanan: string;
  tanggalMulaiPerjalanan: Date;
  tanggalAkhirPerjalanan: Date;
}
