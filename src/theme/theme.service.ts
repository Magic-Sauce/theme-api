import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';

import { themeDb } from '../db.connection';
import { DBTheme, ThemeResultsDto } from './types';
import { GetThemesDto } from './types/query.dto';

@Injectable()
export class ThemeService {
  async getThemes(data: GetThemesDto): Promise<ThemeResultsDto> {
    const docs: DBTheme[] = await themeDb
      .find({
        ...(data.after && { updatedAtCursor: { $lt: data.after } }),
      })
      .sort({
        updatedAtCursor: -1,
      })
      .limit(Number(data.limit ?? 10))
      .exec()
      .then((docs) => docs as any[]);

    const results: ThemeResultsDto = {
      pageInfo: {
        hasNextPage: docs.length === Number(data.limit ?? 10),
        maxCursor: docs[docs.length - 1]?.updatedAtCursor,
      },
      edges: docs.map((doc) => {
        return {
          cursor: doc.updatedAtCursor,
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

    return themeDb.insert({
      ...createDto,
      updatedAt: new Date(),
      updatedAtCursor: new ObjectId().toHexString(),
    });
  }

  async updateTheme(id: string, update: any) {
    if (update.default === true) await this._flushDefaultTheme();

    return themeDb.update(
      {
        _id: id,
      },
      {
        $set: {
          ...update,
          updatedAt: new Date(),
          updatedAtCursor: new ObjectId().toHexString(),
        },
      },
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
