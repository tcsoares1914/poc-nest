import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateUserInput } from '@src/users/dto/create-user.input';
import { UpdateUserInput } from '@src/users/dto/update-user.input';
import { User } from '@src/users/schemas/user.schema';

@Injectable()
export class UsersService {
  /**
   * Inject repository dependency.
   */
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  /**
   * Create a new user.
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = new this.userModel(createUserInput);
    const newUser = await user.save();

    if (!newUser) {
      throw new InternalServerErrorException(
        'Problem to create a new user. Try again!',
      );
    }

    return newUser;
  }

  /**
   * Find all users.
   */
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  /**
   * Find a user by ID.
   */
  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Update a user by ID.
   */
  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Remove a user by ID.
   */
  async remove(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }
    const user = this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
