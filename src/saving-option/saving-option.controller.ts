import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { SavingOptionService } from './saving-option.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddSavingOptionDto } from './dto/saving-option.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { PaginationDto } from 'src/shared/dto/shared.dto';
import { SharedService } from 'src/shared/shared.service';

@Controller('saving-option')
export class SavingOptionController {
  constructor(
    private savingOptionService: SavingOptionService,
    private sharedService: SharedService,
  ) {}

  // Create Saving Options
  @ApiTags('Saving Options')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['super-admin'])
  @ApiBearerAuth('JWT')
  @Post()
  async create(@Body() body: AddSavingOptionDto) {
    try {
      return await this.savingOptionService.create(body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Saving Options listing
  @ApiTags('Saving Options')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  // @SetMetadata('roles', ['super-admin', 'admin'])
  @ApiBearerAuth('JWT')
  @Get()
  async planListing(@Query() queryParams: PaginationDto) {
    try {
      const params = await this.sharedService.prepareParams(queryParams);
      return await this.savingOptionService.get(params);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
