import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { TripModule } from './modules/trip/trip.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt/jwt.strategy';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserTripModule } from './modules/user_trip/user_trip.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    AuthModule,
    TripModule,
    UserTripModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy, PrismaService, AppService],
})
export class AppModule {}
