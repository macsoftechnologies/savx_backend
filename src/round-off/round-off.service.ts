import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { statusType } from 'src/shared/dto/shared.dto';
import { RoundOff } from './dto/round-off.schema';

@Injectable()
export class RoundOffService {
  constructor(
    @InjectModel('RoundOff') private roundOffModel: Model<RoundOff>,
  ) {}

  async create(userId: string, params: any): Promise<any> {
    try {
      const duplicateRecord = await this.roundOffModel.findOne({
        userId: userId,
        status: statusType.ACTIVE,
        isDeleted: false,
      });

      if (duplicateRecord) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'User already enrolled for Round Off.',
        };
      }

      const createRoundOffRes = await this.roundOffModel.create({
        ...params,
        userId,
      });

      let response = {
        statusCode: HttpStatus.OK,
        data: createRoundOffRes,
        message: 'RoundOff registered successfully.',
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

  //  Get Round Off
  async get(userId: string): Promise<any> {
    try {
      const roundOff = await this.roundOffModel.find({
        userId,
        status: statusType.ACTIVE,
        isDeleted: false,
      });

      return {
        statusCode: HttpStatus.OK,
        data: { roundOff },
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
