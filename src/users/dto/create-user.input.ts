import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
