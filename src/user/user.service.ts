import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendOtpDto, VerifyOtpDto } from './dto/user.dto';
import { User } from './dto/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async create(params: any): Promise<any> {
    try {
      const duplicateMobileNumber = await this.userModel.findOne({
        countryCode: params.countryCode,
        mobileNumber: params.mobileNumber,
        isDeleted: false,
      });

      if (duplicateMobileNumber) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: params.mobileNumber + ' already registered',
        };
      }

      const createUserRes = await this.userModel.create(params);

      let response = {
        statusCode: HttpStatus.OK,
        data: createUserRes,
        message: 'User registered successfully.',
      };
      return response;
    } catch (error) {
      let error_response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  async sendOtp(params: SendOtpDto): Promise<any> {
    try {
      let user = await this.userModel.findOne({
        countryCode: params.countryCode,
        mobileNumber: params.mobileNumber,
        isDeleted: false,
      });

      // const OTP = Math.random().toString().substring(2, 8);
      const OTP = '123456';

      if (user) {
        await this.userModel.updateOne(
          {
            countryCode: params.countryCode,
            mobileNumber: params.mobileNumber,
            isDeleted: false,
          },
          { OTP },
        );
      } else {
        await this.userModel.create({
          countryCode: params.countryCode,
          mobileNumber: params.mobileNumber,
          OTP,
        });
      }

      let response = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'OTP Sent successfully.',
      };
      return response;
    } catch (error) {
      let error_response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  async verifyOtp(params: VerifyOtpDto): Promise<any> {
    try {
      const user = await this.userModel
        .findOne({
          countryCode: params.countryCode,
          mobileNumber: params.mobileNumber,
          isDeleted: false,
        })
        .lean();

      if (user) {
        if (user.OTP == params.OTP) {
          delete user.OTP;
          const data: any = await this.authService.login({
            ...user,
          });
          return {
            statusCode: HttpStatus.OK,
            data: {
              user: {
                access_token: data.access_token,
                ...user,
              },
            },
            message: 'LogIn Successful',
          };
        }
      } else {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: params.mobileNumber + ' not registered',
        };
      }
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        data: null,
        message: 'Invalid OTP',
      };
    } catch (error) {
      let error_response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }
}
