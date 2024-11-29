import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SavingOption } from './dto/saving-option.schema';
import { FetchParamsDto } from 'src/shared/dto/shared.dto';

@Injectable()
export class SavingOptionService {
  constructor(
    @InjectModel('SavingOption') private savingOptionModel: Model<SavingOption>,
  ) {}

  async create(params: any): Promise<any> {
    try {
      const duplicateName = await this.savingOptionModel.findOne({
        name: params.name,
        isDeleted: false,
      });

      if (duplicateName) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
          message: params.name + ' already registered',
        };
      }

      const createSavingOptionRes = await this.savingOptionModel.create(params);

      let response = {
        statusCode: HttpStatus.OK,
        data: createSavingOptionRes,
        message: 'SavingOption registered successfully.',
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

  async createMasterData(params: any): Promise<any> {
    try {
      const duplicateName = await this.savingOptionModel.findOne({
        name: params.name,
        isDeleted: false,
      });

      if (!duplicateName) {
        await this.savingOptionModel.create(params);
      }
    } catch (error) {
      console.log(
        'Saving Option createMasterData error' + JSON.stringify(error),
      );
    }
  }

  //  Get Saving Options
  async get(params: FetchParamsDto): Promise<any> {
    try {
      const sortObject = {};
      sortObject[params.paginationObject.sortBy] =
        params.paginationObject.sortOrder == 'ASC' ? 1 : -1;

      const findObject: any = { isDeleted: false, ...params.findObject };

      if (findObject.searchString) {
        findObject.name = {
          $regex: '.*' + findObject.searchString + '.*',
          $options: 'i',
        };

        delete findObject.searchString;
      }

      const savingOptionsCount = await this.savingOptionModel.countDocuments(
        findObject,
      );
      const savingOptions = await this.savingOptionModel
        .find(findObject)
        .sort(sortObject)
        .skip(params.paginationObject.start)
        .limit(params.paginationObject.limit);

      return {
        statusCode: HttpStatus.OK,
        data: { savingOptions, total_count: savingOptionsCount },
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
