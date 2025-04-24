import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, Matches } from 'class-validator';

export class CreateUserDto {
  id?: number;

  @ApiProperty({
    description: 'name',
    example: 'John Doe',
    required: true,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    description: 'email',
    example: '9Xb4M@example.com',
    required: true,
    type: String,
    format: 'email',
    minLength: 3,
    maxLength: 50,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'password',
    required: true,
    type: String,
    format: 'password',
    minLength: 8,
    maxLength: 50,
  })
  password: string;

  @ApiProperty({
    description: 'phone number',
    example: '08123456789',
    required: true,
    type: String,
    format: 'string',
    minLength: 10,
    maxLength: 15,
  })
  @Matches(/^\d+$/, {
    message: 'Phone number must contain only numeric characters',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'role',
    example: 'USER',
    required: true,
    type: String,
    format: 'string',
    minLength: 3,
    maxLength: 50,
    enum: ['USER', 'ADMIN'],
  })
  @IsEnum(['USER', 'ADMIN'])
  role: string;
}
