import { test } from '../../fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

//npm start to start app on localhost
test.describe('test POM methods @server', () => {
  //additionally if we want to retry specified tests
  test.describe.configure({ retries: 1 });

  //To run only this spec tests in parallel mode, when globally we can put false in config
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach('Navigate to source', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.goto('/');
    expect(page.url()).toBe('http://localhost:4200/pages/iot-dashboard');
  });

  test('navigate', async ({ sideBarComponent }, testInfo) => {
    if (testInfo.retry) {
      //Make some clean up
    }
    await sideBarComponent.goToMenuItem('Forms', 'Form Layouts');
    await sideBarComponent.goToMenuItem('Charts', 'Echarts');
  });

  test('form layout test', async ({ sideBarComponent, formLayoutPage }) => {
    const randomName = faker.person.fullName();
    const randomNumber = faker.number.int().toString();
    const password = faker.number.int().toString();
    const radioBtnName = 'Option 2';
    const rememberMe = true;
    const email = `${randomName.replace(' ', '')}${randomNumber}@com.us`;

    await sideBarComponent.goToMenuItem('Forms', 'Form Layouts');
    //Also we can call screenshot for locator.screenshot()
    //await sideBarComponent.page.screenshot({ path: "screenshots/menuItem.png"});
    await formLayoutPage.signInUsingThisGrid(email, password, radioBtnName);
    await formLayoutPage.submitInlineForm(randomName, email, rememberMe);
  });
});
