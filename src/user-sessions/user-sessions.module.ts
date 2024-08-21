import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSessionsSchema } from './dto/user-sessions.schema';
import { UserSessionsService } from './user-sessions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserSessions', schema: UserSessionsSchema },
    ]),
  ],
  providers: [UserSessionsService],
})
export class UserSessionsModule {}
