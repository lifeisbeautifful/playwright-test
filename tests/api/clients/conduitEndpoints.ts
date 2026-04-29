const BASE_URL = 'https://conduit-api.bondaracademy.com/api';

export const conduitEndpoints = {
  articles: `${BASE_URL}/articles/`,
  article: (slug: string) => `${BASE_URL}/articles/${slug}`,
};
