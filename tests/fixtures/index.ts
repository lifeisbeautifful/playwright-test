import { test as base } from '@playwright/test';
import fs from 'fs';
import { ApiHelper } from './ApiHelper';
import { ConduitApiClient } from '../api/clients/ConduitApiClient';
import { SideBarComponent } from '../ui/pages/sideBarComponent';
import { FormLayoutPage } from '../ui/pages/formLayoutPage';
import { DatePickerPage } from '../ui/pages/datePickerPage';
import { TooltipPage } from '../ui/pages/tooltipPage';
import { SmartTablePage } from '../ui/pages/smartTablePage';
import { IoTDashboardPage } from '../ui/pages/ioTDashboardPage';
import { Toastr } from '../ui/pages/toastr';
import { Header } from '../ui/pages/header';

type Fixtures = {
  // API
  apiHelper: ApiHelper;
  conduitApiClient: ConduitApiClient;
  // UI
  sideBarComponent: SideBarComponent;
  formLayoutPage: FormLayoutPage;
  datePickerPage: DatePickerPage;
  tooltipPage: TooltipPage;
  smartTablePage: SmartTablePage;
  ioTDashboardPage: IoTDashboardPage;
  toastr: Toastr;
  header: Header;
};

export const test = base.extend<Fixtures>({
  // API fixtures
  apiHelper: async ({ playwright }, use) => {
    const authFile = JSON.parse(fs.readFileSync('api/.auth/loginData.json', 'utf-8'));
    const token = authFile.origins[0].localStorage.find(
      (i: { name: string }) => i.name === 'jwtToken',
    )?.value;

    const context = await playwright.request.newContext({
      extraHTTPHeaders: { Authorization: `Token ${token}` },
    });

    await use(new ApiHelper(context));
    await context.dispose();
  },

  conduitApiClient: async ({ apiHelper }, use) => {
    await use(apiHelper.conduitApiClient);
  },

  // UI fixtures
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

export { expect } from '@playwright/test';
