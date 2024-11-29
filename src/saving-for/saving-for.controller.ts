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
import { SharedService } from 'src/shared/shared.service';
import { SavingForService } from './saving-for.service';
import { AddSavingForDto } from './dto/saving-for.dto';

@Controller('saving-for')
export class SavingForController {
  constructor(
    private savingForService: SavingForService,
    private sharedService: SharedService,
  ) {}

  // Create Saving For
  @ApiTags('Saving For')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Post()
  async create(@Request() req, @Body() body: AddSavingForDto) {
    try {
      return await this.savingForService.create(req.user._id, body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Create Saving For
  @ApiTags('Saving For')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Get()
  async get(@Request() req) {
    try {
      return await this.savingForService.get(req.user._id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
