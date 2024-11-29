import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export enum savingForStatusType {
  'IN_PROGRESS' = 'in-progress',
  'COMPLETED' = 'completed',
  'FAILED' = 'failed',
}

export class AddSavingForDto {
  @ApiProperty()
  @IsString()
  savingOptionId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comment: string;
}
