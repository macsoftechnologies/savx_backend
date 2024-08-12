import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

// process.env.NODE_OPTIONS = '--tls-min-v1.0';
const connectionString = process.env.DB_CONNECTION_STRING;

@Module({
  imports: [MongooseModule.forRoot(connectionString), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
