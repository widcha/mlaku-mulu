import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserTripService } from './user_trip.service';
import { CreateUserTripDto } from './dto/create-user_trip.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/guards/auth.guard';
import { RolesGuard } from 'src/app/guards/roles.guard';
import { Roles } from 'src/app/decorators/roles.decorator';
import { RolesEnum } from 'src/app/enums/role.enum';
import { FindUserTripDto } from './dto/find-user-trip.dto';

@ApiTags('User-trip')
@ApiBearerAuth()
@Controller('user-trip')
export class UserTripController {
  constructor(private readonly userTripService: UserTripService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Create a new user trip (Admin only)' })
  @ApiResponse({ status: 201, description: 'Trip successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createUserTripDto: CreateUserTripDto) {
    return this.userTripService.create(createUserTripDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Find trips by user ID (Admin or User)' })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: Number,
    description: 'Optional userId, required only for Admin',
  })
  @ApiQuery({
    name: 'tanggalMulaiPerjalanan',
    required: false,
    type: String,
    description: 'Filter by start date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'tanggalAkhirPerjalanan',
    required: false,
    type: String,
    description: 'Filter by end date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'destinasiPerjalanan',
    required: false,
    type: String,
    description: 'Filter by destination',
  })
  @ApiResponse({ status: 200, description: 'List of user trips.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findTripsByUserId(
    @Req() req: any,
    @Query() findUserTripDto: FindUserTripDto,
  ) {
    const userId =
      req.user.role === RolesEnum.USER
        ? req.user.id
        : findUserTripDto.userId
          ? findUserTripDto.userId
          : req.user.id;
    return this.userTripService.findUserTrips(userId, findUserTripDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Delete a user trip by ID (Admin only)' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID of the user trip to delete',
  })
  @ApiResponse({ status: 200, description: 'User trip successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userTripService.delete(id);
  }
}
