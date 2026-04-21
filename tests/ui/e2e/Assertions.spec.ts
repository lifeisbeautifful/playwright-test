import { test, expect } from '@playwright/test';

test.describe('assertions', () => {
  test.beforeEach('Form layouts navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByTitle('Forms').click();
    console.log('tes3');
    await page.getByTitle('Form Layouts').click();
  });

  //tags could be used for spec also
  test('text assertions @regression', async ({ page }) => {
    //textContent() - to extract text from specificly found element
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
    const submitBtn = basicForm.locator('button');
    expect(await submitBtn.textContent()).toEqual('Submit');

    //allTextContent() - return text for all found elements
    const radioBtns = await page.locator('nb-radio').allTextContents();
    expect(radioBtns).toContain('Option 1');

    //inputValue() - to extract input value
    const email = 'test';
    const basicFormEmail = basicForm.getByRole('textbox', { name: 'Email' });
    await basicFormEmail.fill(email);
    const emailText = await basicFormEmail.inputValue();
    expect(emailText).toEqual(email);

    //get attribute value
    expect(await basicFormEmail.getAttribute('placeholder')).toBe('Email');
  });

  test('generic and locator asertions @test @regression', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
    const basicSubmitBtn = basicForm.getByRole('button');
    const submitText = await basicSubmitBtn.textContent();

    //Generic assertion we assert some value
    //This assertions do not wait and do not have a timeout
    expect(submitText).toBe('Submit');

    //Locator assertions - wait for default timeout (5s), to check some locator property
    await expect(basicSubmitBtn).toHaveText('Submit');

    //Soft assertions - will not cause test running if it fails
    await expect.soft(basicSubmitBtn).toHaveText('Submit');
    await basicSubmitBtn.click();
  });
});
