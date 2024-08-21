import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional } from 'class-validator';

enum SessionStatus {
  Active = 'active',
  InActive = 'in_active',
  Expired = 'expired',
  ForceKill = 'force_kill',
  LoggedOut = 'logged_out',
}

@Schema({ timestamps: true })
export class UserSessions extends Document {
  @Prop()
  userId: string;

  @Prop()
  sessionId: string;

  @Prop({ default: new Date() })
  lastActiveAt: Date;

  // 'active', 'in_active', 'expired', 'force_kill', 'logged_out'
  @Prop({
    enum: ['active', 'in_active'],
    default: 'active',
  })
  status: string;

  @Prop()
  deviceType: string;

  @Prop()
  deviceModel: string;

  @Prop()
  osVersion: string;

  @Prop()
  deviceToken: string;

  @Prop()
  expiresAt: Date;

  @Prop({ default: false })
  @IsOptional()
  isDeleted?: boolean;
}

export const UserSessionsSchema = SchemaFactory.createForClass(UserSessions);
