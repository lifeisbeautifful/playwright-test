import { test as baseTest } from '@playwright/test';
import { SideBarComponent } from '../pages/sideBarComponent';
import { FormLayoutPage } from '../pages/formLayoutPage';
import { DatePickerPage } from '../pages/datePickerPage';
import { TooltipPage } from '../pages/tooltipPage';
import { SmartTablePage } from '../pages/smartTablePage';
import { IoTDashboardPage } from '../pages/ioTDashboardPage';
import { Toastr } from '../pages/toastr';
import { Header } from '../pages/header';

type testFixture = {
  sideBarComponent: SideBarComponent;
  formLayoutPage: FormLayoutPage;
  datePickerPage: DatePickerPage;
  tooltipPage: TooltipPage;
  smartTablePage: SmartTablePage;
  ioTDashboardPage: IoTDashboardPage;
  toastr: Toastr;
  header: Header;
};

export const test = baseTest.extend<testFixture>({
  sideBarComponent: async ({ page }, use) => {
    await use(new SideBarComponent(page));
  },
  formLayoutPage: async ({ page }, use) => {
    await use(new FormLayoutPage(page));
  },
  datePickerPage: async ({ page }, use) => {
    await use(new DatePickerPage(page));
  },
  tooltipPage: async ({ page }, use) => {
    await use(new TooltipPage(page));
  },
  smartTablePage: async ({ page }, use) => {
    await use(new SmartTablePage(page));
  },
  ioTDashboardPage: async ({ page }, use) => {
    await use(new IoTDashboardPage(page));
  },
  toastr: async ({ page }, use) => {
    await use(new Toastr(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
});
