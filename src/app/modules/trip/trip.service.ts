import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';

@Injectable()
export class TripService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    console.log(createTripDto);
    return await this.prismaService.trip.create({
      data: {
        tanggalMulaiPerjalanan: new Date(
          createTripDto.tanggalMulaiPerjalanan,
        ).toISOString(),
        tanggalAkhirPerjalanan: new Date(
          createTripDto.tanggalAkhirPerjalanan,
        ).toISOString(),
        destinasiPerjalanan: createTripDto.destinasiPerjalanan,
      },
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    const trip = await this.prismaService.trip.findUnique({
      where: {
        id: id,
      },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    return await this.prismaService.trip.update({
      where: {
        id: id,
      },
      data: {
        tanggalMulaiPerjalanan: new Date(updateTripDto.tanggalMulaiPerjalanan),
        tanggalAkhirPerjalanan: new Date(updateTripDto.tanggalAkhirPerjalanan),
        destinasiPerjalanan: updateTripDto.destinasiPerjalanan,
      },
    });
  }

  async findTrips(findTripDto: FindTripDto) {
    return await this.prismaService.trip.findMany({
      where: {
        tanggalMulaiPerjalanan: findTripDto.tanggalMulaiPerjalanan
          ? { gte: new Date(findTripDto.tanggalMulaiPerjalanan) }
          : undefined,
        tanggalAkhirPerjalanan: findTripDto.tanggalAkhirPerjalanan
          ? { lte: new Date(findTripDto.tanggalAkhirPerjalanan) }
          : undefined,
        destinasiPerjalanan: findTripDto.destinasiPerjalanan,
        deletedAt: null,
      },
    });
  }

  async findTripById(id: number) {
    return await this.prismaService.trip.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
    });
  }

  async delete(id: number) {
    const trip = await this.prismaService.trip.findUnique({
      where: {
        id: id,
      },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    await this.prismaService.trip.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'Trip deleted successfully',
    };
  }
}
