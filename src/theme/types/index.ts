import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export * from './theme-results.dto';
export * from './query.dto';

export class CreateThemeDto {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  default?: boolean;
}
export class UpdateThemeDto {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  default?: boolean;
}

export class DBTheme {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  default?: boolean;

  @IsDate()
  @ApiProperty()
  updatedAt!: Date;

  @IsString()
  @ApiProperty()
  updatedAtCursor!: string;
}
