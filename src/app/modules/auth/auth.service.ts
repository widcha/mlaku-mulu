import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { role } from 'generated/prisma';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../guards/jwt/interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
        phoneNumber: signUpDto.phoneNumber,
        role: role[signUpDto.role],
      },
    });

    // const token = await this.jwtService.signAsync({
    //   id: newUser.id,
    //   name: newUser.name,
    //   email: newUser.email,
    //   role: newUser.role,
    // });

    const payload: JwtPayload = {
      sub: newUser.id,
      name: newUser.name,
      email: newUser.email,
      roles: [newUser.role],
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: newUser,
      token,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new ConflictException('Invalid password');
    }

    // const token = await this.jwtService.signAsync({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   roles: user.role,
    // });

    const payload: JwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: [user.role],
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user,
      token,
    };
  }
}
