import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSessions } from './dto/user-sessions.schema';

@Injectable()
export class UserSessionsService {
  constructor(
    @InjectModel('UserSessions') private userSessionsModel: Model<UserSessions>,
  ) {}

  async create(params: any): Promise<any> {
    try {
      await this.makeOldSessionsInActive(params);
      let response = {
        statusCode: HttpStatus.OK,
        data: await this.userSessionsModel.create(params),
        message: 'User Session created successfully.',
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

  async makeOldSessionsInActive(params: any): Promise<any> {
    try {
      await this.userSessionsModel.updateMany(
        { userId: params.userId, status: 'active' },
        { status: 'in_active' },
      );
      return;
    } catch (error) {
      return error;
    }
  }

  async update(userId: string, params: any): Promise<any> {
    try {
      await this.userSessionsModel.updateOne(
        { userId, status: 'active' },
        params,
      );

      let response = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'User Session created successfully.',
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
}
