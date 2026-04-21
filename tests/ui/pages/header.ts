import { Page, Locator, test, expect } from '@playwright/test';

export class Header {
  readonly page: Page;
  private readonly dropdown: Locator;
  private readonly dropdownList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = this.page.locator('ngx-header nb-select');
    this.dropdownList = this.page.locator('nb-option-list nb-option');
  }

  async selectHeaderTheme(option: string, colorCss: string) {
    await test.step(`Select ${option} from dropdown`, async () => {
      await this.dropdown.click();
      await expect(this.dropdownList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);
      //when are ul tag
      //page.getByRole("list")

      //page.getByRole("listitem") if we have li tag
      await this.dropdownList.filter({ hasText: option }).click();

      const header = this.page.locator('nb-layout-header');
      await expect(header).toHaveCSS('background-color', colorCss);
    });
  }
}
