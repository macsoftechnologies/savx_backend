import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { paymentMethodType } from 'src/shared/dto/shared.dto';

export class AddDailySavingDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsEnum(paymentMethodType)
  payment_method: string;
}
