import { Page, Locator, test, expect } from '@playwright/test';

export class TooltipPage {
  readonly page: Page;
  private readonly tooltipPlacement: Locator;
  private readonly tooltipPlacementRightBtn: Locator;
  private readonly tooltip: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tooltipPlacement = this.page.locator('nb-card').filter({ hasText: 'Tooltip Placements' });
    this.tooltipPlacementRightBtn = this.tooltipPlacement.getByRole('button', { name: 'Right' });
    this.tooltip = this.page.locator('nb-tooltip');
  }

  async verifyRightBtnTooltip() {
    await test.step('Verify right button tooltip displays', async () => {
      await this.tooltipPlacementRightBtn.hover();
      await expect(this.tooltip).toHaveText('This is a tooltip');
    });
  }
}
