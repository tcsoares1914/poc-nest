import { User } from '@src/users/schemas/user.schema';
import { CreateUserDto } from '@src/users/dto/create-user.dto';

export class UserTestMocks {
  static getValidUser(): User {
    const user = new User();
    user.firstName = 'Peter';
    user.lastName = 'Parker';
    user.email = 'peter@domain.com';
    user.password = 'password';

    return user;
  }

  static getValidUserDto(): CreateUserDto {
    const user = new CreateUserDto();
    user.firstName = 'Peter';
    user.lastName = 'Parker';
    user.email = 'peter@domain.com';
    user.password = 'password';

    return user;
  }

  static getUsers(): User[] {
    const users: User[] = [
      {
        firstName: 'Peter',
        lastName: 'Parker',
        email: 'peter@domain.com',
        password: 'password',
        role: 'USER',
        created: new Date(),
        updated: new Date(),
      },
      {
        firstName: 'Miles',
        lastName: 'Morales',
        email: 'miles@domain.com',
        password: 'password',
        role: 'USER',
        created: new Date(),
        updated: new Date(),
      },
    ];

    return users;
  }

  static getNewUser(): User {
    const newUser: User = new User({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    return newUser;
  }

  static getUpdatedUser() {
    return new User({
      email: 'peter@spider.com',
    });
  }
}
