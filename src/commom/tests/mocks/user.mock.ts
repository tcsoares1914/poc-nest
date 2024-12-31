import { User } from '@src/users/schemas/user.schema';
import { CreateUserInput } from '@src/users/dto/create-user.input';

export class UserTestMocks {
  public static getValidUser(): User {
    const user = new User();
    user.firstName = 'Bruce';
    user.lastName = 'Wayne';
    user.email = 'bruce@domain.com';
    user.password = '12345678';

    return user;
  }

  public static getValidUserDto(): CreateUserInput {
    const user = new CreateUserInput();
    user.firstName = 'Bruce';
    user.lastName = 'Wayne';
    user.email = 'bruce@domain.com';
    user.password = '12345678';

    return user;
  }

  public static getUsers(): User[] {
    const users: User[] = [
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'bruce@domain.com',
        password: '12345678',
      },
      {
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'klark@domain.com',
        password: '12345678',
      },
      {
        firstName: 'Diana',
        lastName: 'Prince',
        email: 'diana@domain.com',
        password: '12345678',
      },
    ];

    return users;
  }

  public static getNewUser(): User {
    const newuser: User = new User({
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@domain.com',
      password: '12345678',
    });

    return newuser;
  }

  public static getUpdatedUser() {
    return new User({
      email: 'batman@domain.com',
    });
  }
}
