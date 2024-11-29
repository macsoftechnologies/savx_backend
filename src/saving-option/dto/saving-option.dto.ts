import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

enum savingOptionType {
  'default' = 'default',
  'custom' = 'custom',
}

export class AddSavingOptionDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEnum(savingOptionType)
  type: string;
}
