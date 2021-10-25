import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import {
  CreateThemeDto,
  UpdateThemeDto,
  GetThemesDto,
  ThemeResultsDto,
} from './types';
import { ThemeService } from './theme.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('theme')
export class ThemeController {
  constructor(private _service: ThemeService) {}

  @Get()
  @ApiResponse({
    type: ThemeResultsDto,
  })
  getThemes(@Query() query: GetThemesDto) {
    return this._service.getThemes(query);
  }

  @Get(':id')
  @ApiResponse({
    type: ThemeResultsDto,
  })
  getTheme(@Param('id') id: string) {
    return this._service.getThemeById(id);
  }

  @Post()
  @ApiResponse({
    type: ThemeResultsDto,
  })
  @ApiBody({ type: CreateThemeDto })
  createTheme(@Body() body: any) {
    return this._service.createTheme(body);
  }

  @Patch(':id')
  @ApiResponse({
    type: ThemeResultsDto,
  })
  @ApiBody({ type: UpdateThemeDto })
  updateTheme(@Body() body: any, @Param('id') id: string) {
    return this._service.updateTheme(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    type: ThemeResultsDto,
  })
  async deleteTheme(@Param('id') id: string) {
    await this._service.deleteTheme(id);
    return { status: 'success' };
  }
}
