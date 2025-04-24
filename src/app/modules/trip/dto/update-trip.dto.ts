import { ApiProperty } from '@nestjs/swagger';

export class UpdateTripDto {
  @ApiProperty({
    description: 'tanggal mulai perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: true,
    type: String,
    format: 'date',
  })
  tanggalMulaiPerjalanan: Date;

  @ApiProperty({
    description: 'tanggal akhir perjalanan',
    example: '2025-04-24T05:55:05.999Z',
    required: true,
    type: String,
    format: 'date',
  })
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
  destinasiPerjalanan: string;
}
