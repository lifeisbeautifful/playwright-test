import { Page, Locator, test, expect } from "@playwright/test";

export class Toastr {
    readonly page: Page;
    private readonly checkbox: (name: string) => Locator;

    constructor(page:Page) {
        this.page = page;
        this.checkbox = (name: string) => this.page.getByRole("checkbox", { name: name });
    }

    async checkCheckbox(name: string) {
        await test.step(`Check ${name} checkbox`, async () => {
            await this.checkbox(name).check({ force: true });
            await expect(this.checkbox(name)).toBeChecked();
        })
    }

    async unCheckCheckbox(name: string) {
        await test.step(`Uncheck ${name} checkbox`, async () => {
            await this.checkbox(name).uncheck({ force: true });
            expect(await this.checkbox(name).isChecked()).toBeFalsy();
        })
    }

    async unCheckAllCheckboxes() {
        await test.step("Uncheck all checkboxes", async () => {
            const allCheckboxes = this.page.getByRole("checkbox");

            for(let box of await allCheckboxes.all()) {
                await box.uncheck({ force: true });
                await expect(box).not.toBeChecked();
            }
        })
    }
}