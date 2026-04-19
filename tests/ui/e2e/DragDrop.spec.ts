import { test, expect } from "@playwright/test";

test.describe("Test drag and drop inside iframe", () => {
    test("IFrame and Drag and drop", async ({ page }) => {
        await page.goto("./draganddrop");
        const elements = [
            "High Tatras 3",
            "High Tatras 4"
        ]

        const frame = page.frameLocator("[rel-title='Photo Manager'] iframe");
        const dragToPoint = frame.locator("#trash");
        //First option
        await frame.locator("li", { hasText: `${elements[0]}`}).dragTo(frame.locator("#trash"));

        //Second option
        await frame.locator("li", { hasText: `${elements[1]}`}).hover();
        await page.mouse.down();
        await dragToPoint.hover();
        await page.mouse.up();

        await expect(dragToPoint.locator("h5")).toHaveText([elements[0], elements[1]]);
    })
})