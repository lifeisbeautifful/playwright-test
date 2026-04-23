import { test, expect } from '@playwright/test';
// @ts-ignore
import data from './test-data/conduit.json' assert { type: 'json' };

test.describe('api tests', () => {
  test.beforeEach('Navigate', async ({ page }) => {
    await page.route('*/**/api/tags', async (route) => {
      await route.fulfill({ body: JSON.stringify(data) });
    });

    await page.route('*/**/api/articles*', async (route) => {
      const response = await route.fetch();
      const responseBody = await response.json();
      responseBody.articles[0].title = 'My';
      responseBody.articles[0].description = 'test';

      await route.fulfill({ body: JSON.stringify(responseBody) });
    });

    await page.goto('https://conduit.bondaracademy.com/');
  });

  test('test', async ({ page }) => {
    await page.pause();
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.locator('app-article-list h1').first()).toHaveText('My');
    await expect(page.locator('app-article-list p').first()).toHaveText('test');
  });
});
