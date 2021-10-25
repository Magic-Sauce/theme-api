import { Injectable } from '@nestjs/common';

import { themeDb } from '../db.connection';
import { ThemeResultsDto } from './types';
import { GetThemesDto } from './types/query.dto';

@Injectable()
export class ThemeService {
  async getThemes(data: GetThemesDto): Promise<ThemeResultsDto> {
    const docs = await themeDb
      .find({
        ...(data.after && { _id: { $lt: data.after } }),
      })
      .sort({
        _id: -1,
      })
      .limit(Number(data.limit ?? 10))
      .exec();

    const results: ThemeResultsDto = {
      pageInfo: {
        hasNextPage: docs.length === Number(data.limit ?? 10),
        maxCursor: docs[docs.length - 1]?._id,
      },
      edges: docs.map((doc) => {
        return {
          cursor: doc._id,
          node: doc,
        };
      }),
    };

    return results;
  }

  async getThemeById(id: string) {
    return themeDb.findOne({
      _id: id,
    });
  }

  async getDefaultTheme() {
    return themeDb.findOne({
      default: true,
    });
  }

  async _flushDefaultTheme() {
    await themeDb.update(
      { default: true },
      { $set: { default: false } },
      { multi: true },
    );
  }

  async createTheme(createDto: any) {
    if (createDto.default === true) await this._flushDefaultTheme();

    return themeDb.insert(createDto);
  }

  async updateTheme(id: string, update: any) {
    if (update.default === true) await this._flushDefaultTheme();

    return themeDb.update(
      {
        _id: id,
      },
      { $set: update },
      { returnUpdatedDocs: true },
    );
  }

  async deleteTheme(id: string) {
    return themeDb.remove(
      {
        _id: id,
      },
      {
        multi: true,
      },
    );
  }
}
