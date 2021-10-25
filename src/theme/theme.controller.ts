import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateThemeDto,
  UpdateThemeDto,
  GetThemesDto,
  ThemeResultsDto,
  DBTheme,
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

  @Get('/default')
  @ApiResponse({
    type: DBTheme,
  })
  getDefault() {
    const doc = this._service.getDefaultTheme();
    if (!doc) throw new NotFoundException();
    return doc;
  }

  @Get(':id')
  @ApiResponse({
    type: DBTheme,
  })
  getTheme(@Param('id') id: string) {
    const doc = this._service.getThemeById(id);
    if (!doc) throw new NotFoundException('Not found');
    return doc;
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
  async updateTheme(@Body() body: any, @Param('id') id: string) {
    const existingTheme = await this._service.getThemeById(id);
    if (!existingTheme) throw new NotFoundException();
    return this._service.updateTheme(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    type: ThemeResultsDto,
  })
  async deleteTheme(@Param('id') id: string) {
    const existingTheme = await this._service.getThemeById(id);
    if (!existingTheme) throw new NotFoundException();

    await this._service.deleteTheme(id);

    return { status: 'success' };
  }
}
