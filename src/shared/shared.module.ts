import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SavingOptionService } from 'src/saving-option/saving-option.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingOptionSchema } from 'src/saving-option/dto/saving-option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SavingOption', schema: SavingOptionSchema },
    ]),
  ],
  controllers: [SharedController],
  providers: [SavingOptionService],
})
export class SharedModule {}
