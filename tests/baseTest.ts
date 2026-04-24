import { test as base, APIRequestContext } from '@playwright/test';
import fs from 'fs';

// Додаємо тип для нашої фікстури
type MyFixtures = {
  apiContext: APIRequestContext;
};

export const test = base.extend<MyFixtures>({
  apiContext: async ({ playwright }, use) => {
    const authFile = JSON.parse(fs.readFileSync('tests/api/.auth/loginData.json', 'utf-8'));
    const token = authFile.origins[0].localStorage.find(
      (i: { name: string }) => i.name === 'jwtToken',
    )?.value;

    const context = await playwright.request.newContext({
      extraHTTPHeaders: { Authorization: `Token ${token}` },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
