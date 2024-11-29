import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class SavingOption extends Document {
  @Prop()
  name: string;

  @Prop({
    enum: ['default', 'custom'],
  })
  type: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const SavingOptionSchema = SchemaFactory.createForClass(SavingOption);
