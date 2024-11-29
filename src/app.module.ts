import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserSessionsModule } from './user-sessions/user-sessions.module';
import { SavingOptionModule } from './saving-option/saving-option.module';
import { SharedModule } from './shared/shared.module';
import { SavingForModule } from './saving-for/saving-for.module';
import { DailySavingsModule } from './daily-savings/daily-savings.module';
import { RoundOffModule } from './round-off/round-off.module';

// process.env.NODE_OPTIONS = '--tls-min-v1.0';
const connectionString = process.env.DB_CONNECTION_STRING;

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    AuthModule,
    UserModule,
    UserSessionsModule,
    SavingOptionModule,
    SharedModule,
    SavingForModule,
    DailySavingsModule,
    RoundOffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
