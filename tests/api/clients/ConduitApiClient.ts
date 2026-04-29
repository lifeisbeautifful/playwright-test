import { APIResponse } from '@playwright/test';
import { ApiHelper } from '../../fixtures/ApiHelper';
import { ArticlePayload } from '../test-data/conduitTestData';
import { conduitEndpoints } from './conduitEndpoints';

export class ConduitApiClient {
  private readonly helper: ApiHelper;

  constructor(helper: ApiHelper) {
    this.helper = helper;
  }

  async createArticle(article: ArticlePayload): Promise<APIResponse> {
    return this.helper.post(conduitEndpoints.articles, {
      data: { article },
    });
  }

  async deleteArticle(slug: string): Promise<APIResponse> {
    return this.helper.delete(conduitEndpoints.article(slug));
  }
}
