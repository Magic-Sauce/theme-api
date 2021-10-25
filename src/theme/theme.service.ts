import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';

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

  async createTheme(createDto: any) {
    return themeDb.insert(createDto);
  }

  async updateTheme(id: string, update: any) {
    console.log(id, { $set: update });
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
