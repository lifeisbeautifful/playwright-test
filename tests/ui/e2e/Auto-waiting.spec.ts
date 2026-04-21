import { test, expect } from '@playwright/test';

test.describe('auto-waiting', () => {
  //Modify timeout for entire suite
  test.beforeEach('Open Ajax website', async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
    testInfo.setTimeout(testInfo.timeout + 20000);
  });

  test('test auto-waiting', async ({ page }) => {
    //This will auto wait for element
    //await page.locator(".bg-success").click();

    //textContent() - will wait for element
    // const text = await page.locator(".bg-success").textContent();
    // expect(text).toBe("Data loaded with AJAX get request.");

    //allTextContent() - will not wait so we use waitFor() - to wait for some element states(visible etc)
    const ajaxButton = page.locator('.bg-success');
    // await ajaxButton.waitFor({ state: "visible" });
    // expect(await ajaxButton.allTextContents()).toContain("Data loaded with AJAX get request.");

    //we can override expect timeout
    await expect(ajaxButton).toHaveText('Data loaded with AJAX get request.', { timeout: 60000 });
  });

  test('auto-waiting options', async ({ page }) => {
    const ajaxButton = page.locator('.bg-success');

    //wait for element
    await page.waitForSelector('.bg-success', { timeout: 20000 });

    //wait for response
    //await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    //wait for all network calls(not recommended because if some call stucked - test fail)
    //await page.waitForLoadState("networkidle")

    //also can wait
    //await page.waitForURL("");

    const text = await ajaxButton.allTextContents();

    expect(text).toContain('Data loaded with AJAX get request.');
  });

  test('timeouts', async ({ page }) => {
    //to set timeout for specific test
    test.setTimeout(10000);
    //Increase test timeouts 3 time
    test.slow();
    const ajaxButton = page.locator('.bg-success');
    //There are also timeout for each test, globalTimeOut, action, navigation, expext timeouts
    await ajaxButton.click({ timeout: 30000 });
  });
});
