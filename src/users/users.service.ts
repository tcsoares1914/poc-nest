import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, isValidObjectId } from 'mongoose';
import { CreateUserInput } from '@src/users/dto/create-user.input';
import { UpdateUserInput } from '@src/users/dto/update-user.input';
import { User } from '@src/users/schemas/user.schema';

@Injectable()
export class UsersService {
  /**
   * Inject repository dependency.
   *
   * @param {Model<User>} userModel The user model.
   */
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  /**
   * Create a new user.
   *
   * @public
   * @param {CreateUserInput} createUserInput input user data.
   * @returns {Promise<User>} The created user.
   */
  public async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
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
   *
   * @public
   * @returns {Promise<User[]>} All users list.
   */
  public async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  /**
   * Find a user by ID.
   *
   * @public
   * @param {string} id user ID.
   * @returns {Promise<User>} The user found.
   */
  public async findOne(id: string): Promise<User> {
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
   *
   * @public
   * @param {string} id user ID.
   * @param {UpdateUserInput} updateUserInput input user data.
   * @returns {Promise<User>} The updated user.
   */
  public async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }
    if (updateUserInput.password.length > 0) {
      updateUserInput.password = await this.hashPassword(
        updateUserInput.password,
      );
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Remove a user by ID.
   *
   * @public
   * @param {string} id user ID.
   * @returns {Promise<User>} The removed user.
   */
  public async remove(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID must be a ObjectId!');
    }
    const user = this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Encrypt password
   *
   * @protected
   * @param {string} password The password to be encrypted.
   * @returns {Promise<string>} The encrypted password.
   */
  protected async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
