import { Module } from '@nestjs/common';
import { SavingOptionController } from './saving-option.controller';
import { SavingOptionService } from './saving-option.service';
import { SavingOptionSchema } from './dto/saving-option.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SavingOption', schema: SavingOptionSchema },
    ]),
  ],
  controllers: [SavingOptionController],
  providers: [SavingOptionService, SharedService],
})
export class SavingOptionModule {}
