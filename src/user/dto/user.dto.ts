import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/shared/dto/shared.dto';

enum likeType {
  'story' = 'story',
  'album' = 'album',
  'artist' = 'artist',
}

enum genderType {
  'male' = 'male',
  'female' = 'female',
  'other' = 'other',
}

enum searchType {
  'stories' = 'stories',
  'albums' = 'albums',
}

enum ageGroupType {
  '18-25' = '18-25',
  '25-35' = '25-35',
  '35-45' = '35-45',
  '45-55' = '45-55',
  '55 and above' = '55 and above',
}

export class AddUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  mobileNumber: string;
}

export class SendOtpDto {
  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  mobileNumber: string;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  mobileNumber: string;

  @ApiProperty()
  @IsString()
  OTP: string;
}
