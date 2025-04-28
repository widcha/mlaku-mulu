import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindTripDto } from './dto/find-trip.dto';
import { JwtAuthGuard } from 'src/app/guards/auth.guard';
import { RolesGuard } from 'src/app/guards/roles.guard';
import { Roles } from 'src/app/decorators/roles.decorator';
import { RolesEnum } from 'src/app/enums/role.enum';

@ApiTags('Trip')
@ApiBearerAuth()
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Create a new trip (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Trip successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, validation errors.',
  })
  @ApiBody({ type: CreateTripDto })
  async create(@Body() createTripDto: CreateTripDto) {
    return await this.tripService.create(createTripDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({
    summary: 'Find trips based on query parameters (Admin or User)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of trips.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, validation errors.',
  })
  async findTrips(@Query() findTripDto: FindTripDto) {
    return await this.tripService.findTrips(findTripDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Get a specific trip by ID (Admin or User)' })
  @ApiResponse({
    status: 200,
    description: 'Trip found by ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid trip ID.',
  })
  async findTripById(@Param('id', ParseIntPipe) id: number) {
    return await this.tripService.findTripById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Update an existing trip (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Trip successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, validation errors.',
  })
  @ApiBody({ type: UpdateTripDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return await this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Delete a specific trip by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Trip successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid trip ID.',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tripService.delete(id);
  }
}
