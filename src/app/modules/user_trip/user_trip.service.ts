import { Injectable } from '@nestjs/common';
import { CreateUserTripDto } from './dto/create-user_trip.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResultFindUserTrip, FindUserTripDto } from './dto/find-user-trip.dto';

@Injectable()
export class UserTripService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserTripDto: CreateUserTripDto) {
    const userTrip = await this.prisma.userTrip.create({
      data: {
        userId: createUserTripDto.userId,
        tripId: createUserTripDto.tripId,
      },
    });
    return {
      id: userTrip.id,
      message: 'UserTrip created successfully',
    };
  }

  async findUserTrips(userId: number, findUserTripDto: FindUserTripDto) {
    const trips = await this.prisma.userTrip
      .findMany({
        where: {
          userId: userId, // Filter by userId
          trips: {
            AND: [
              findUserTripDto.tanggalMulaiPerjalanan
                ? {
                    tanggalMulaiPerjalanan: {
                      gte: findUserTripDto.tanggalMulaiPerjalanan,
                    },
                  }
                : {}, // Filter by start date (greater than or equal)
              findUserTripDto.tanggalAkhirPerjalanan
                ? {
                    tanggalAkhirPerjalanan: {
                      lte: findUserTripDto.tanggalAkhirPerjalanan,
                    },
                  }
                : {}, // Filter by end date (less than or equal)
              findUserTripDto.destinasiPerjalanan
                ? {
                    destinasiPerjalanan: {
                      contains: findUserTripDto.destinasiPerjalanan,
                      mode: 'insensitive',
                    },
                  }
                : {}, // Filter by destination (case insensitive partial match)
            ],
          },
        },
        select: {
          id: true, // Select the userTrip id
          trips: {
            // Include the trip details
            select: {
              id: true,
              tanggalMulaiPerjalanan: true,
              tanggalAkhirPerjalanan: true,
              destinasiPerjalanan: true,
            },
          },
        },
      })
      .then((userTrips) =>
        userTrips.map((userTrip) => ({
          id: userTrip.id,
          tripId: userTrip.trips.id,
          destinasiPerjalanan: userTrip.trips.destinasiPerjalanan,
          tanggalMulaiPerjalanan: userTrip.trips.tanggalMulaiPerjalanan,
          tanggalAkhirPerjalanan: userTrip.trips.tanggalAkhirPerjalanan,
        })),
      );

    const result: ResultFindUserTrip[] = trips.map((trip) => ({
      id: trip.id,
      tripId: trip.tripId,
      destinasiPerjalanan: trip.destinasiPerjalanan,
      tanggalMulaiPerjalanan: trip.tanggalMulaiPerjalanan,
      tanggalAkhirPerjalanan: trip.tanggalAkhirPerjalanan,
    }));

    return result;
  }

  async delete(id: number) {
    await this.prisma.userTrip.delete({
      where: {
        id: id,
      },
    });

    return {
      id: id,
      message: 'User trip deleted successfully',
    };
  }
}
