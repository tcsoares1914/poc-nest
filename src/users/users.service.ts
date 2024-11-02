import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { UpdateUserDto } from '@src/users/dto/update-user.dto';
import { User } from '@src/users/schemas/user.schema';

@Injectable()
export class UsersService {
  /**
   * Inject repository dependency.
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Create new collection item.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel(createUserDto);
    const newUser = await user.save();

    if (!newUser) {
      throw new InternalServerErrorException(
        'Problem to create a user. Try again!',
      );
    }

    return newUser;
  }

  /**
   * List all collection items.
   */
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  /**
   * List one collection item.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * List one collection item.
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Update one collection item.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Delete one collection item.
   */
  async remove(id: string): Promise<User> {
    const user = this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Encrypt password
   */
  protected async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
