import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SavingFor } from './dto/saving-for.schema';
import { savingForStatusType } from './dto/saving-for.dto';

@Injectable()
export class SavingForService {
  constructor(
    @InjectModel('SavingFor') private savingForModel: Model<SavingFor>,
  ) {}

  async create(userId: string, params: any): Promise<any> {
    try {
      const duplicateRecord = await this.savingForModel.findOne({
        userId: userId,
        status: savingForStatusType.IN_PROGRESS,
        isDeleted: false,
      });

      if (duplicateRecord) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: 'User already saving for a goal.',
        };
      }

      const createSavingForRes = await this.savingForModel.create({
        ...params,
        userId,
      });

      let response = {
        statusCode: HttpStatus.OK,
        data: createSavingForRes,
        message: 'SavingFor registered successfully.',
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

  //  Get Saving For
  async get(userId: string): Promise<any> {
    try {
      const savingFor = await this.savingForModel.aggregate([
        {
          $match: {
            userId,
            status: savingForStatusType.IN_PROGRESS,
            isDeleted: false,
          },
        },
        {
          $addFields: {
            user_id: {
              $toObjectId: '$userId',
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            let: {
              user_id: '$user_id',
              isDeleted: false,
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$user_id'] },
                      { $eq: ['$isDeleted', '$$isDeleted'] },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: '$_id',
                  countryCode: { $first: '$countryCode' },
                  mobileNumber: { $first: '$mobileNumber' },
                },
              },
            ],
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $addFields: {
            saving_option_id: {
              $toObjectId: '$savingOptionId',
            },
          },
        },
        {
          $lookup: {
            from: 'savingoptions',
            let: {
              saving_option_id: '$saving_option_id',
              isDeleted: false,
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$saving_option_id'] },
                      { $eq: ['$isDeleted', '$$isDeleted'] },
                    ],
                  },
                },
              },
            ],
            as: 'savingoption',
          },
        },
        {
          $unwind: {
            path: '$savingoption',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return {
        statusCode: HttpStatus.OK,
        data: { savingFor },
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
