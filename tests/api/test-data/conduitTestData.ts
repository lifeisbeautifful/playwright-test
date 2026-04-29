export interface ArticlePayload {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export const articlePayloads: Record<string, ArticlePayload> = {
  newTestArticle: {
    title: 'New Test',
    description: 'New Test',
    body: 'New Test',
    tagList: [],
  },
};
