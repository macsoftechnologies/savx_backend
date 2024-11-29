import {
  Body,
  Controller,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { SavingOptionService } from 'src/saving-option/saving-option.service';

const savingOptions = [
  {
    name: 'Phone/Laptop',
    type: 'default',
  },
  {
    name: 'Bike/Car',
    type: 'default',
  },
  {
    name: 'Travel/Trip',
    type: 'default',
  },
  {
    name: 'Something else',
    type: 'custom',
  },
];

@Controller('shared')
export class SharedController {
  constructor(private savingOptionService: SavingOptionService) {}

  // Create Super Admin
  @ApiTags('Shared')
  //   @UseGuards(RolesGuard)
  //   @UseGuards(JwtAuthGuard)
  //   @SetMetadata('roles', ['super-admin'])
  //   @ApiBearerAuth('JWT')
  @Post('/master-data')
  async create(@Body() body: any) {
    try {
      for (let savingOption of savingOptions) {
        await this.savingOptionService.createMasterData(savingOption);
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      };
    }
  }
}
