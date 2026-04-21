import { Page, expect } from '@playwright/test';
import { HelperTest } from './helperTest';

export class DatePickerPage extends HelperTest {
  constructor(page: Page) {
    super(page);
  }

  async enterCommonDatePickerDate(daysTillNow: number) {
    const commonDatePickerInput = this.page.getByPlaceholder('Form Picker');
    await commonDatePickerInput.click();
    const expectedFullDate = await this.selectDate(daysTillNow);

    await expect(commonDatePickerInput).toHaveValue(expectedFullDate);
    await this.waitForSeconds(5);
  }

  async enterRangeDatePickerDate(startDateTillNow: number, endDateTillNow: number) {
    const rangeDatePickerInput = this.page.getByPlaceholder('Range Picker');
    await rangeDatePickerInput.click();

    const startFulDate = await this.selectDate(startDateTillNow);
    const endFullDate = await this.selectDate(endDateTillNow);

    const fullRangeDate = `${startFulDate} - ${endFullDate}`;
    await expect(rangeDatePickerInput).toHaveValue(fullRangeDate);
  }

  private async selectDate(daysTillNow: number) {
    let date = new Date();
    date.setDate(date.getDate() + daysTillNow);

    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleDateString('En-Us', { month: 'short' });
    const expectedMonthLong = date.toLocaleDateString('En-Us', { month: 'long' });
    const expectedYear = date.getFullYear().toString();
    const expectedFullDate = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let datePickerDate = await this.page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthYear = `${expectedMonthLong} ${expectedYear}`;

    while (!datePickerDate?.includes(expectedMonthYear)) {
      await this.page.locator('button.next-month').click();
      datePickerDate = await this.page.locator('nb-calendar-view-mode').textContent();
    }

    const currentMontDates = this.page.locator('.day-cell.ng-star-inserted');
    await currentMontDates.getByText(expectedDate, { exact: true }).click();
    return expectedFullDate;
  }
}
