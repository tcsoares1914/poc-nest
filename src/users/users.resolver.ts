import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '@src/users/users.service';
import { CreateUserInput } from '@src/users/dto/create-user.input';
import { UpdateUserInput } from '@src/users/dto/update-user.input';

@Resolver('User')
export class UsersResolver {
  /**
   * Inject service dependency.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   */
  @Mutation('createUser')
  public create(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  /**
   * Find all users.
   */
  @Query('users')
  public findAll() {
    return this.usersService.findAll();
  }

  /**
   * Find a user by ID.
   */
  @Query('user')
  public findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Update a user by ID.
   */
  @Mutation('updateUser')
  public update(
    @Args('id') id: string,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  /**
   * Remove a user by ID.
   */
  @Mutation('removeUser')
  public remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
