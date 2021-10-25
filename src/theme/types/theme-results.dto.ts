import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { PageInfo } from '../../types';

export class ThemeEdgesDto {
  @IsObject()
  @ApiProperty()
  node!: any;

  @IsString()
  @ApiProperty()
  cursor!: string;
}

export class ThemeResultsDto {
  @ApiProperty({ type: PageInfo })
  pageInfo: PageInfo;

  @ApiProperty({ type: ThemeEdgesDto, isArray: true })
  edges: ThemeEdgesDto[];
}
