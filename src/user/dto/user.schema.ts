import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  userName: string;

  @Prop()
  emailAddress: string;

  @Prop()
  countryCode: string;

  @Prop()
  mobileNumber: string;

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
