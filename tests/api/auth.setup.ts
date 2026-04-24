import { test as setup } from '@playwright/test';
// @ts-ignore
import fs from 'fs';

const authPath = 'tests/api/.auth/loginData.json';

setup('api authentication', async ({ request }) => {
  //UI auth
  // await page.goto('https://conduit.bondaracademy.com/');
  // await page.getByRole('link', { name: 'Sign in' }).click();
  // await page.getByRole('textbox', { name: 'Email'}).fill('test@test.com');
  // await page.getByRole('textbox', { name: 'Password'}).fill('test');
  // await page.getByRole('button', { name: 'Sign in' }).click();

  // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags');

  // await page.context().storageState({path: authPath});

  //API auth
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: {
        email: 'test@test.com',
        password: 'test',
      },
    },
  });

  const resposeBody = await response.json();
  const accessToken = resposeBody.user.token;

  // Формуємо структуру, яку розуміє Playwright для LocalStorage
  const state = {
    cookies: [],
    origins: [
      {
        origin: 'https://conduit.bondaracademy.com',
        localStorage: [{ name: 'jwtToken', value: accessToken }],
      },
    ],
  };

  fs.writeFileSync(authPath, JSON.stringify(state));
});
