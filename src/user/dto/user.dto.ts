import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsString()
  deviceToken: string;

  @ApiProperty()
  @IsString()
  deviceType: string;

  @ApiProperty()
  @IsString()
  deviceModel: string;

  @ApiProperty()
  @IsString()
  osVersion: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  emailAddress: string;

  @ApiProperty()
  @IsString()
  address: string;
}
