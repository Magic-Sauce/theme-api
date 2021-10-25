import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class GetThemesDto {
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  @ApiPropertyOptional()
  limit?: string;

  @IsOptional()
  @IsString({})
  @ApiPropertyOptional()
  after?: string;
}
