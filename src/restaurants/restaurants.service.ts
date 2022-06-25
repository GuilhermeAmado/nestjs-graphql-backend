import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
  ) {}

  createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    const newRestaurant =
      this.restaurantsRepository.create(createRestaurantDto);

    return this.restaurantsRepository.save(newRestaurant);
  }

  getAll() {
    return this.restaurantsRepository.find();
  }

  updateRestaurant(id: number, data: UpdateRestaurantDto) {
    console.log({ id, data });
    return this.restaurantsRepository.update(id, { ...data });
  }
}
