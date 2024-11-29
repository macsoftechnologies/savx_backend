import { Module } from '@nestjs/common';
import { DailySavingsController } from './daily-savings.controller';
import { DailySavingsService } from './daily-savings.service';
import { DailySavingsSchema } from './dto/daily-savings.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DailySavings', schema: DailySavingsSchema },
    ]),
  ],
  controllers: [DailySavingsController],
  providers: [DailySavingsService],
})
export class DailySavingsModule {}
