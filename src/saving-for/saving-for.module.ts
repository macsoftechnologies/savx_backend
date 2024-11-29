import { Module } from '@nestjs/common';
import { SavingForController } from './saving-for.controller';
import { SavingForService } from './saving-for.service';
import { SharedService } from 'src/shared/shared.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingForSchema } from './dto/saving-for.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SavingFor', schema: SavingForSchema }]),
  ],
  controllers: [SavingForController],
  providers: [SavingForService, SharedService],
})
export class SavingForModule {}
