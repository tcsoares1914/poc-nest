import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: true,
})
@ObjectType()
export class User {
  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ required: false })
  @Field()
  email: string;

  @Prop({ required: true })
  @HideField()
  password: string;

  constructor(user?: Partial<User>) {
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.password = user?.password;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
