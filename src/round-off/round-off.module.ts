import { Module } from '@nestjs/common';
import { RoundOffController } from './round-off.controller';
import { RoundOffService } from './round-off.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundOffSchema } from './dto/round-off.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RoundOff', schema: RoundOffSchema }]),
  ],
  controllers: [RoundOffController],
  providers: [RoundOffService],
})
export class RoundOffModule {}
