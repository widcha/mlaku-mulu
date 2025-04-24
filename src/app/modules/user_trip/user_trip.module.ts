import { Module } from '@nestjs/common';
import { UserTripService } from './user_trip.service';
import { UserTripController } from './user_trip.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserTripController],
  providers: [UserTripService, PrismaService],
})
export class UserTripModule {}
