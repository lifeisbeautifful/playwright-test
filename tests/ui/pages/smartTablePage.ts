import { Page, Locator, test, expect } from "@playwright/test";

export class SmartTablePage {
    readonly page: Page;
    private readonly tableRowOption1: (columnText: string) => Locator;
    private readonly tableRowOption2: (columnText: string) => Locator;
    //Tp exclude column duplication for precise search
    private readonly tableRowOption3: (columnText: string, columnPosition: number) => Locator;
    private readonly rowEditBtn2: (columnText: string, columnPosition: number) => Locator;
    private readonly rowDeleteBtn: (columnText: string) => Locator;
    private readonly rowEditBtn: (columnText: string) => Locator;
    private readonly editColumn: (placeholder: string) => Locator;
    private readonly checkMark: Locator;
    private readonly paginationNav: Locator;
    private readonly columnFilterInput: (placeholder: string) =>  Locator;

    constructor(page: Page) {
        this.page = page;

        //first option to search target row
        this.tableRowOption1 = (columnText: string) => this.page.getByRole("table").locator("tr").filter({ hasText: columnText });
        this.rowDeleteBtn = (columnText: string) => this.tableRowOption1(columnText).locator(".nb-trash");

        //second option to search target row
        this.tableRowOption2 = (columnText: string) => this.page.getByRole("row", { name: columnText });
        this.rowEditBtn = (columnText: string) => this.tableRowOption2(columnText).locator(".nb-edit");

        //third option to search target row avoid text duplication in diff rows
        ////nth(1) - це саме друга колонка має містити такий текст
        this.tableRowOption3 = (columnText: string, columnPosition: number) => this.page.getByRole("row", { name: columnText }).filter({ has: page.locator("td").nth(columnPosition).getByText(columnText)});
        this.rowEditBtn2 = (columnText: string, columnPosition: number) => this.tableRowOption3(columnText, columnPosition).locator(".nb-edit");
        this.editColumn = (placeholder: string) => this.page.locator("input-editor").getByPlaceholder(placeholder);
        this.checkMark = this.page.locator(".nb-checkmark");
        this.paginationNav = this.page.locator(".ng2-smart-pagination-nav");
        this.columnFilterInput = (placeholder: string) => this.page.locator("input-filter").getByPlaceholder(placeholder);
    }

    async deleteFirstRow(columnText: string) {
        await test.step("Delete first table row", async () => {
            this.acceptDeleteDialog();
            await this.rowDeleteBtn(columnText).click();
            await expect(this.page.locator("table tr").first()).not.toHaveText(columnText);
        })
    }

    async editColumnText(columnPlaceholder: string, oldText: string, newText: string) {
        await test.step(`Enter ${newText} for ${columnPlaceholder}`, async () => {
            await this.rowEditBtn(oldText).click();
            await this.editColumn(columnPlaceholder).clear();
            await this.editColumn(columnPlaceholder).fill(newText);
            await this.checkMark.click();
        })
    }

    async editColumnTextAvoidDuplication(oldValue: string, columnPosition: number, newValue: string, columnPlaceholder: string) {
        await test.step(`Edit column text`, async () => {
            await this.rowEditBtn2(oldValue, columnPosition - 1).click();
            await this.editColumn(columnPlaceholder).clear();
            await this.editColumn(columnPlaceholder).fill(newValue);
            await this.checkMark.click();
        })
    }

    async navigateToPage(number: string) {
        await test.step(`Select page number ${number}`, async () => {
            await this.paginationNav.getByText(number).click();
        })
    }

    async verifyFilteringBy(filterColumn: string, columnPosition: number, filterText: string, rowsExist = true) {
        await test.step(`Verify filtering by ${filterColumn}`, async () => {
            await this.columnFilterInput(filterColumn).clear();
            await this.columnFilterInput(filterColumn).fill(filterText);
            await this.page.waitForTimeout(500);
            const rows = this.page.locator("tbody tr");

            //rows.all() - for converting it to array
            for(let row of await rows.all()) {
                if(!rowsExist){
                    await expect(this.page.locator("table")).toContainText("No data found");
                }
                else
                {
                    const text = await row.locator("td").nth(columnPosition - 1).textContent();
                    expect(text).toContain(filterText);
                }
            }
        })
    }

    private acceptDeleteDialog() {
      this.page.on("dialog", dialog => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
      }
    )}
}