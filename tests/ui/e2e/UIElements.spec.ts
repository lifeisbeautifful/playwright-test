import { test } from '../fixtures/testFixture';
import { expect } from '@playwright/test';
import { sidebarTabs } from '../test-data/sidebarTabs';

//npm start to start app on localhost
test.describe('test different type of ui elements', () => {
  test.beforeEach('Navigate to source page', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toBe(String(process.env.LOCALHOST_URL));
  });

  test('tooltip', async ({ sideBarComponent, tooltipPage }) => {
    await sideBarComponent.goToMenuItem(sidebarTabs.ModalOverlays, sidebarTabs.Tooltip);
    await tooltipPage.verifyRightBtnTooltip();
  });

  test('dialog', async ({ sideBarComponent, smartTablePage }) => {
    const deleteEmail = 'mdo@gmail.com';

    await sideBarComponent.goToMenuItem(sidebarTabs.TablesData, sidebarTabs.SmartTable);
    await smartTablePage.deleteFirstRow(deleteEmail);
  });

  //search by table column value
  test('table', async ({ sideBarComponent, smartTablePage }) => {
    const changedUsername = 'text';
    const oldName = 'Sparrow';
    const oldAge = '11';
    const newAge = '19';

    await sideBarComponent.goToMenuItem(sidebarTabs.TablesData, sidebarTabs.SmartTable);

    //search row by some column text
    await smartTablePage.editColumnText('Username', oldName, changedUsername);
    await smartTablePage.navigateToPage('2');

    //search row by specified table column text, if text is duplicated
    await smartTablePage.editColumnTextAvoidDuplication(oldAge, 2, newAge, 'Age');
  });

  test('verify table columns contain same value', async ({ sideBarComponent, smartTablePage }) => {
    const existingAges = ['20', '30', '40'];
    const nonExistAge = '200';
    const columnName = 'Age';

    await sideBarComponent.goToMenuItem(sidebarTabs.TablesData, sidebarTabs.SmartTable);

    for (let age of existingAges) {
      await smartTablePage.verifyFilteringBy(columnName, 7, age);
    }

    await smartTablePage.verifyFilteringBy(columnName, 7, nonExistAge, false);
  });

  test('date picker', async ({ datePickerPage, sideBarComponent }) => {
    await sideBarComponent.goToMenuItem(sidebarTabs.Forms, sidebarTabs.Datepicker);

    await datePickerPage.enterCommonDatePickerDate(20);
    await datePickerPage.enterRangeDatePickerDate(20, 25);
  });

  test('input', async ({ sideBarComponent, formLayoutPage }) => {
    const testValue = 'test2';

    await sideBarComponent.goToMenuItem(sidebarTabs.Forms, sidebarTabs.FormsLayouts);
    //test assertions
    await formLayoutPage.enterBasicEmail(testValue);
  });

  test('radio button', async ({ sideBarComponent, formLayoutPage }) => {
    const radioBtnNames = {
      one: 'Option 1',
      two: 'Option 2',
      disabled: 'Disabled Option',
    };

    await sideBarComponent.goToMenuItem(sidebarTabs.Forms, sidebarTabs.FormsLayouts);
    await formLayoutPage.checkRadioBtn(radioBtnNames.two);
    await formLayoutPage.verifyRadioBtnUnchecked([radioBtnNames.one, radioBtnNames.disabled]);
  });

  test('checkbox', async ({ sideBarComponent, toastr }) => {
    await sideBarComponent.goToMenuItem(sidebarTabs.ModalOverlays, sidebarTabs.Toastr);

    await toastr.checkCheckbox('Prevent arising of duplicate toast');
    await toastr.unCheckCheckbox('Hide on click');
    await toastr.unCheckAllCheckboxes();
  });

  test('dropdown', async ({ header }) => {
    const listOptions: Record<string, string> = {
      Light: 'rgb(255, 255, 255)',
      Dark: 'rgb(34, 43, 69)',
      Cosmic: 'rgb(50, 50, 89)',
      Corporate: 'rgb(255, 255, 255)',
    };

    await header.selectHeaderTheme('Dark', listOptions['Dark']);

    for (let option in listOptions) {
      await header.selectHeaderTheme(option, listOptions[option]);
    }
  });
});
