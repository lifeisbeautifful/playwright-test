const BASE_URL = 'https://conduit-api.bondaracademy.com/api';

export const conduitEndpoints = {
  login: `${BASE_URL}/users/login`,
  articles: `${BASE_URL}/articles/`,
  article: (slug: string) => `${BASE_URL}/articles/${slug}`,
};
