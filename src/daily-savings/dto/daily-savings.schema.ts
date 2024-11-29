import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class DailySavings extends Document {
  @Prop()
  userId: string;

  @Prop()
  amount: number;

  @Prop({
    enum: ['phone-pe', 'g-pay', 'paytm'],
  })
  payment_method: string;

  @Prop({
    enum: ['active', 'in-active'],
    default: 'active',
  })
  status: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const DailySavingsSchema = SchemaFactory.createForClass(DailySavings);
