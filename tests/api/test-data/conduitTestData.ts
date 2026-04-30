import { faker } from '@faker-js/faker';

export interface ArticlePayload {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export const articlePayloads: Record<string, ArticlePayload> = {
  newTestArticle: {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    body: faker.lorem.sentences(2),
    tagList: [faker.word.noun(), faker.word.noun()],
  },
};
