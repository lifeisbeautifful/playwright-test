import { test as setup } from '@playwright/test';
import fs from 'fs';
import { conduitEndpoints } from './api/clients/conduitEndpoints';

const authFile = 'api/.auth/loginData.json';

setup('authenticate', async ({ request }) => {
  // 1. Робимо запит на логін
  const response = await request.post(conduitEndpoints.login, {
    data: {
      user: {
        email: process.env.TEST_USER_LOGIN, // Беремо з секретів GitHub або .env
        password: process.env.TEST_USER_PASSWORD,
      },
    },
  });

  const body = await response.json();
  const token = body.user.token; // або body.jwtToken, залежить від твого API

  // 2. Формуємо структуру, яку очікує твоя фікстура apiHelper
  const authData = {
    cookies: [],
    origins: [
      {
        origin: 'https://conduit.bondaracademy.com',
        localStorage: [{ name: 'jwtToken', value: token }],
      },
    ],
  };

  // 3. Записуємо файл
  if (!fs.existsSync('api/.auth')) {
    fs.mkdirSync('api/.auth', { recursive: true });
  }
  fs.writeFileSync(authFile, JSON.stringify(authData, null, 2));
});
