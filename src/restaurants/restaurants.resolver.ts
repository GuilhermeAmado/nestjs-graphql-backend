import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(() => [Restaurant])
  restaurants() {
    return this.restaurantsService.getAll();
  }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('input') createRestaurantInput: CreateRestaurantDto,
  ) {
    try {
      const restaurant = await this.restaurantsService.createRestaurant(
        createRestaurantInput,
      );
      return restaurant;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }
}
