import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: 'USER' })
  role: string;

  @Prop()
  password: string;

  @Prop()
  created!: Date;

  @Prop()
  updated!: Date;

  constructor(user?: Partial<User>) {
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.password = user?.password;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
