import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AddDailySavingDto } from './dto/round-off.dto';
import { RoundOffService } from './round-off.service';

@Controller('round-off')
export class RoundOffController {
  constructor(private roundOffService: RoundOffService) {}

  // Create Round Off
  @ApiTags('Round Off')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Post()
  async create(@Request() req, @Body() body: AddDailySavingDto) {
    try {
      return await this.roundOffService.create(req.user._id, body);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }

  // Get Round Off
  @ApiTags('Round Off')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['customer'])
  @ApiBearerAuth('JWT')
  @Get()
  async get(@Request() req) {
    try {
      return await this.roundOffService.get(req.user._id);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
