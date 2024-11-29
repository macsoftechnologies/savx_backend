import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { paymentMethodType, paymentType } from 'src/shared/dto/shared.dto';

export class AddDailySavingDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsEnum(paymentType)
  payment_type: string;

  @ApiProperty()
  @IsString()
  @IsEnum(paymentMethodType)
  payment_method: string;
}
