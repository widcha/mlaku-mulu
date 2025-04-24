import { Test, TestingModule } from '@nestjs/testing';
import { UserTripController } from './user_trip.controller';
import { UserTripService } from './user_trip.service';

describe('UserTripController', () => {
  let controller: UserTripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTripController],
      providers: [UserTripService],
    }).compile();

    controller = module.get<UserTripController>(UserTripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
