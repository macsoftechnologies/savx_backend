import { Injectable } from '@nestjs/common';
import { ActionLogsDto, EmailDto, FetchParamsDto } from './dto/shared.dto';
const AWS = require('aws-sdk');
const xlsx = require('xlsx');
const mp3Duration = require('mp3-duration');
const path = require('path');
const spawn = require('await-spawn');
import moment = require('moment');
const fs = require('fs');
import { uuid } from 'uuidv4';
import fetch from 'node-fetch';
import axios from 'axios';

var aes256 = require('aes256');

var key = '08a9022ca0a140ac830145fa8aec316c';

import * as CryptoJS from 'crypto-js';
const _key = CryptoJS.enc.Utf8.parse(process.env.AES_KEY);
const _iv = CryptoJS.enc.Utf8.parse(process.env.AES_IV);

const { google } = require('googleapis');
const androidpublisher = google.androidpublisher('v3');

// const nodemailer = require('nodemailer');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_API_KEY);

var appleReceiptVerify = require('node-apple-receipt-verify');

const auth = new google.auth.GoogleAuth({
  keyFilename: path.join(
    __dirname,
    '../../public/keys/storywaves-af32b-11a6d3f3a283.json',
  ),
  // Scopes can be specified either as an array or as a single, space-delimited string.
  scopes: ['https://www.googleapis.com/auth/androidpublisher'],
});

const paginationObject = {
  start: 0,
  limit: 1000,
  sortBy: 'createdAt',
  sortOrder: 'DESC',
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const actionsTableHeaders = [
  'id',
  'user_id',
  'user_name',
  'user_mobile',
  'action',
  'album_id',
  'album_name',
  'date_time',
];

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
