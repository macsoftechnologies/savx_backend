import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class SavingFor extends Document {
  @Prop()
  userId: string;

  @Prop()
  savingOptionId: string;

  @Prop()
  @IsOptional()
  comment: string;

  @Prop({
    enum: ['in-progress', 'completed', 'failed'],
    default: 'in-progress',
  })
  status: string;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const SavingForSchema = SchemaFactory.createForClass(SavingFor);
