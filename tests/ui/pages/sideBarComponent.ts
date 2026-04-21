import { Locator, Page, test } from '@playwright/test';

export class SideBarComponent {
  readonly page: Page;
  private readonly menuItem: (title: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuItem = (title: string) => this.page.getByTitle(title, { exact: true });
  }

  async goToMenuItem(menu: string, item: string) {
    await test.step(`Navigate to ${menu} ${item}`, async () => {
      await this.selectMainMenuFor(menu);
      await this.page.waitForTimeout(1000);
      await this.menuItem(item).click();
    });
  }

  async selectIoTDashboard() {
    await test.step('Click on IoT Dashboard', async () => {
      await this.page.getByTitle('IoT Dashboard').click();
    });
  }

  private async selectMainMenuFor(menu: string) {
    await test.step(`Expand ${menu} menu item if collapsed`, async () => {
      const menuItemState = await this.menuItem(menu).getAttribute('aria-expanded');
      if (menuItemState !== 'true') {
        await this.menuItem(menu).click();
      }
    });
  }
}
