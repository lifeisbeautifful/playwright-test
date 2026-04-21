import { Page, Locator, test, expect } from '@playwright/test';

export class FormLayoutPage {
  readonly page: Page;
  private readonly usingThisGrid: Locator;
  private readonly usingThisGridEmail: Locator;
  private readonly usingThisGridPassword: Locator;
  private readonly usingThisGridRadioBtn: (name: string) => Locator;
  private readonly usingThisGridSignInBtn: Locator;
  private readonly inlineForm: Locator;
  private readonly inlineFormName: Locator;
  private readonly inlineFormEmail: Locator;
  private readonly inlineFormCheckbox: Locator;
  private readonly inlineFormSubmitBtn: Locator;
  private readonly basicForm: Locator;
  private readonly basicFormEmailInput: Locator;
  private readonly gridRadioBtnOption1: (name: string) => Locator;
  private readonly gridRadioBtnOption2: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.usingThisGrid = this.page.locator('nb-card', { hasText: 'Using the Grid' });
    this.usingThisGridEmail = this.usingThisGrid.getByPlaceholder('Email');
    this.usingThisGridPassword = this.usingThisGrid.getByPlaceholder('Password');
    this.usingThisGridRadioBtn = (name: string) =>
      this.usingThisGrid.getByRole('radio', { name: name });
    this.usingThisGridSignInBtn = this.usingThisGrid.getByRole('button', { name: 'Sign in' });
    this.inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
    this.inlineFormName = this.inlineForm.getByPlaceholder('Jane Doe');
    this.inlineFormEmail = this.inlineForm.getByPlaceholder('Email');
    this.inlineFormCheckbox = this.inlineForm.getByRole('checkbox', { name: 'Remember me' });
    this.inlineFormSubmitBtn = this.inlineForm.getByRole('button', { name: 'Submit' });
    this.basicForm = this.page.locator('nb-card', { hasText: 'Basic form' });
    this.basicFormEmailInput = this.basicForm.getByPlaceholder('Email');
    this.gridRadioBtnOption1 = (name: string) => this.page.getByLabel(name);
    this.gridRadioBtnOption2 = (name: string) => this.page.getByRole('radio', { name: name });
  }

  async signInUsingThisGrid(email: string, password: string, radioBtnName: string) {
    await test.step(`Enter ${email}, ${password}, select ${radioBtnName} radio button and sign in`, async () => {
      await this.usingThisGridEmail.fill(email);
      await this.usingThisGridPassword.fill(password);
      await this.usingThisGridRadioBtn(radioBtnName).check({ force: true });
      await this.usingThisGridSignInBtn.click();
    });
  }

  async submitInlineForm(name: string, email: string, rememberMe: boolean) {
    await test.step(`Submit form with name: ${name}, email: ${email} and remember me checkox set to ${rememberMe}`, async () => {
      await this.inlineFormEmail.fill(email);
      await this.inlineFormName.fill(name);
      if (rememberMe) {
        await this.inlineFormCheckbox.check({ force: true });
      }
      await this.inlineFormSubmitBtn.click();
    });
  }

  async enterBasicEmail(email: string) {
    await test.step(`Enter sequentially tesxt into basic email input`, async () => {
      await this.basicFormEmailInput.clear();
      await this.basicFormEmailInput.pressSequentially(email, { delay: 500 });

      //locators assertion
      await expect(this.basicFormEmailInput).toHaveValue(email);

      //general assertion
      const text = await this.basicFormEmailInput.inputValue();
      expect(text).toEqual(email);
    });
  }

  async checkRadioBtn(name: string) {
    await test.step('Check radio button', async () => {
      await this.gridRadioBtnOption2(name).check({ force: true });
    });
  }

  async verifyRadioBtnUnchecked(names: string[]) {
    await test.step('Verify listed radio buttons unchecked', async () => {
      names.forEach(async (name) => {
        expect(await this.gridRadioBtnOption2(name).isChecked()).toBeFalsy();
      });
    });
  }
}
