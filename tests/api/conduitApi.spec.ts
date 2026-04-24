import { test, expect } from '../baseTest';
// @ts-ignore
import data from './test-data/conduit.json' assert { type: 'json' };

test.describe('api tests', () => {
  test.beforeEach('Navigate', async ({ page }) => {
    await page.route('*/**/api/tags', async (route) => {
      await route.fulfill({ body: JSON.stringify(data) });
    });

    await page.goto('https://conduit.bondaracademy.com/');
  });

  test('test mock', async ({ page }) => {
    await page.getByText(' Global Feed ').click();
    await page.route('*/**/api/articles*', async (route) => {
      const response = await route.fetch();
      const responseBody = await response.json();
      responseBody.articles[0].title = 'My';
      responseBody.articles[0].description = 'test';

      await route.fulfill({ body: JSON.stringify(responseBody) });
    });

    await page.getByText(' Global Feed ').click();
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.locator('app-article-list h1').first()).toHaveText('My');
    await expect(page.locator('app-article-list p').first()).toHaveText('test');
  });

  test('delete article', async ({ page, apiContext }) => {
    const articleResponse = await apiContext.post(
      'https://conduit-api.bondaracademy.com/api/articles/',
      {
        data: {
          article: {
            title: 'New Test',
            description: 'New Test',
            body: 'New Test',
            tagList: [],
          },
        },
      },
    );

    expect(articleResponse.status()).toEqual(201);
    await page.getByText(' Global Feed ').click();

    await page.getByText('New Test').first().click();
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await page.getByText(' Global Feed ').click();
    await expect(page.locator('app-article-list h1').first()).not.toHaveText('New Test');
  });

  test('intercept create article request', async ({ page, apiContext }) => {
    await page.getByRole('link', { name: 'New Article' }).click();
    await page.getByPlaceholder('Article Title').fill('My test name');
    await page.getByPlaceholder("What's this article about?").fill('Test description');
    await page.getByPlaceholder('Write your article (in markdown)').fill('Body');
    await page.getByRole('button', { name: ' Publish Article ' }).click();
    const createArticleResponse = await page.waitForResponse(
      'https://conduit-api.bondaracademy.com/api/articles/',
    );
    const responseBody = await createArticleResponse.json();
    const slug = await responseBody.article.slug;

    await expect(page.locator('.article-page h1')).toHaveText('My test name');

    await page.getByRole('link', { name: ' Home ' }).click();
    await page.getByText(' Global Feed ').click();
    await expect(page.locator('app-article-list h1').first()).toHaveText('My test name');

    const deleteResponse = await apiContext.delete(
      `https://conduit-api.bondaracademy.com/api/articles/${slug}`,
    );

    expect(deleteResponse.status()).toEqual(204);
  });
});
