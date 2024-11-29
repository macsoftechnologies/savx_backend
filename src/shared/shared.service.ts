import { Injectable } from '@nestjs/common';
import { FetchParamsDto } from './dto/shared.dto';
// const AWS = require('aws-sdk');
// const xlsx = require('xlsx');
// const mp3Duration = require('mp3-duration');
// const path = require('path');
// const spawn = require('await-spawn');
// const fs = require('fs');

const paginationObject = {
  start: 0,
  limit: 1000,
  sortBy: 'createdAt',
  sortOrder: 'DESC',
};

@Injectable()
export class SharedService {
  async prepareParams(params: any): Promise<any> {
    // params = Object.assign(params, paginationObject);
    const config: FetchParamsDto = {
      paginationObject: {
        start: params.start ? parseInt(params.start) : paginationObject.start,
        limit: params.limit ? parseInt(params.limit) : paginationObject.limit,
        sortBy: params.sortBy ? params.sortBy : paginationObject.sortBy,
        sortOrder: params.sortOrder
          ? params.sortOrder
          : paginationObject.sortOrder,
      },
      findObject: params,
    };

    delete config.findObject.start;
    delete config.findObject.limit;
    delete config.findObject.sortBy;
    delete config.findObject.sortOrder;

    return config;
  }
}
