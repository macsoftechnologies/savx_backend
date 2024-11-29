import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailySavings } from './dto/daily-savings.schema';
import { statusType } from 'src/shared/dto/shared.dto';

@Injectable()
export class DailySavingsService {
  constructor(
    @InjectModel('DailySavings') private dailySavingsModel: Model<DailySavings>,
  ) {}

  async create(userId: string, params: any): Promise<any> {
    try {
      const duplicateRecord = await this.dailySavingsModel.findOne({
        userId: userId,
        status: statusType.ACTIVE,
        isDeleted: false,
      });

      if (duplicateRecord) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'User already enrolled for Daily Savings.',
        };
      }

      const createDailySavingsRes = await this.dailySavingsModel.create({
        ...params,
        userId,
      });

      let response = {
        statusCode: HttpStatus.OK,
        data: createDailySavingsRes,
        message: 'DailySavings registered successfully.',
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

  //  Get Daily Savings
  async get(userId: string): Promise<any> {
    try {
      const dailySavings = await this.dailySavingsModel.find({
        userId,
        status: statusType.ACTIVE,
        isDeleted: false,
      });

      return {
        statusCode: HttpStatus.OK,
        data: { dailySavings },
        message: 'Request successfully.',
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
