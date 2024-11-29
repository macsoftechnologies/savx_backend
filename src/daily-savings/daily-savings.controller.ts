import {
  Body,
  Controller,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { DailySavingsService } from './daily-savings.service';
import { AddDailySavingDto } from './dto/daily-savings.dto';

@Controller('daily-savings')
export class DailySavingsController {
  constructor(private dailySavingsService: DailySavingsService) {}

  // Create Daily Savings
  @ApiTags('Daily Savings')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Post()
  async create(@Request() req, @Body() body: AddDailySavingDto) {
    try {
      return await this.dailySavingsService.create(req.user._id, body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Daily Savings
  @ApiTags('Daily Savings')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Get()
  async get(@Request() req) {
    try {
      return await this.dailySavingsService.get(req.user._id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
