import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum booleanType {
  'true' = 'true',
  'false' = 'false',
}

const sortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

export const months_old = {
  '0': 'Jan',
  '1': 'Feb',
  '2': 'Mar',
  '3': 'Apr',
  '4': 'May',
  '5': 'Jun',
  '6': 'Jul',
  '7': 'Aug',
  '8': 'Sep',
  '9': 'Oct',
  '10': 'Nov',
  '11': 'Dec',
};

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  start: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiProperty({ required: false, enum: sortOrder })
  @IsString()
  @IsOptional()
  sortOrder: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  searchString: string;
}

export class PaginationParamsDto {
  start: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}

export class FetchParamsDto {
  paginationObject: PaginationParamsDto;
  findObject: any;
}

export class EmailDto {
  to: string;
  subject: string;
  text?: string;
  inputData?: object;
}

export class ActionLogsDto {
  user_id: string;
  user_name: string;
  user_mobile: string;
  action: string;
  album_id?: string;
  album_name?: string;
  date_time: Date;
}
