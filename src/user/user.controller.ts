import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SendOtpDto, UpdateUserDto, VerifyOtpDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Create Super Admin
  @ApiTags('User')
  @Post('/createSuperAdmin')
  async createSuperAdmin() {
    try {
      const superAdmin = {
        firstName: 'Super',
        lastName: 'Admin',
        userName: 'superAdmin',
        emailAddress: 'super-admin@savx.com',
        countryCode: '+91',
        mobileNumber: '9876543210',
        role: 'super-admin',
      };
      return await this.userService.create(superAdmin);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Send OTP
  @ApiTags('User')
  @Post('/send-otp')
  async sendOtp(@Body() body: SendOtpDto) {
    try {
      return await this.userService.sendOtp(body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Verify OTP
  @ApiTags('User')
  @Post('/verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    try {
      return await this.userService.verifyOtp(body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Verify OTP
  @ApiTags('User')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  // @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Put()
  async update(@Request() req, @Body() body: UpdateUserDto) {
    try {
      return await this.userService.updateUser(req.user._id, body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
