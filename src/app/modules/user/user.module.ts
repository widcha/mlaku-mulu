import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
