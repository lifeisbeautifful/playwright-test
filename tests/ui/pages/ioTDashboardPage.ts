import { Page, Locator } from '@playwright/test';

export class IoTDashboardPage {
  readonly page: Page;
  private readonly sliderBox: Locator;
  private readonly slider: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sliderBox = this.page.locator("[tabtitle='Temperature'] ngx-temperature-dragger");
    this.slider = this.sliderBox.locator('circle');
  }
}
