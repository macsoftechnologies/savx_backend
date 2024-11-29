import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  emailAddress: string;

  @Prop()
  countryCode: string;

  @Prop()
  mobileNumber: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop({
    enum: ['super-admin', 'admin', 'customer'],
    default: 'customer',
  })
  role: string;

  @Prop()
  OTP: string;

  @Prop()
  OTPExpiryTime: number;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
