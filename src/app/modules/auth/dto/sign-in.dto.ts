import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SignInDto {
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
    minLength: 3,
    maxLength: 50,
  })
  password: string;
}
