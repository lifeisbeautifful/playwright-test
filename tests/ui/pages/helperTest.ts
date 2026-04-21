import { Page } from '@playwright/test';

export class HelperTest {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSeconds(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}
