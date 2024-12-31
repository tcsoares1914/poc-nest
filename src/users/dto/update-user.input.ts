import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from '@src/users/dto/create-user.input';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
