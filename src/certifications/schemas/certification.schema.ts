import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CertificationDocument = HydratedDocument<Certification>;

@Schema({
  collection: 'certifications',
  timestamps: true,
})
@ObjectType()
export class Certification {
  @Prop({ required: true })
  @Field()
  code: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: false })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field()
  status: string;

  @Prop({ required: false })
  @Field()
  certificationUrl: string;

  @Prop({ required: false })
  @Field()
  badgeUrl: string;

  constructor(certification?: Partial<Certification>) {
    this.code = certification?.code;
    this.name = certification?.name;
    this.description = certification?.description;
    this.status = certification?.status;
    this.certificationUrl = certification?.certificationUrl;
    this.badgeUrl = certification?.badgeUrl;
  }
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);
