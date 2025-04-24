import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { role } from 'generated/prisma';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user && user.deletedAt === null) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.prisma.user.upsert({
      where: {
        email: createUserDto.email,
      },
      create: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        phoneNumber: createUserDto.phoneNumber,
        role: role[createUserDto.role],
      },
      update: {
        deletedAt: null,
      },
    });

    return {
      user: newUser,
    };
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
      },
    });

    return {
      user: updatedUser,
    };
  }

  async delete(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'User deleted successfully',
    };
  }
}
