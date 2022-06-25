import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
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
  async createRestaurant(@Args('data') data: CreateRestaurantDto) {
    try {
      const restaurant = await this.restaurantsService.createRestaurant(data);
      return restaurant;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurant(
    @Args('restaurantId') restaurantId: number,
    @Args('data') data: UpdateRestaurantDto,
  ) {
    try {
      await this.restaurantsService.updateRestaurant(restaurantId, data);
      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }
}
