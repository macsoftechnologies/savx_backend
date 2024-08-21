import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dto/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserSessionsService } from 'src/user-sessions/user-sessions.service';
import { UserSessionsSchema } from 'src/user-sessions/dto/user-sessions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserSessions', schema: UserSessionsSchema },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserSessionsService],
})
export class UserModule {}
