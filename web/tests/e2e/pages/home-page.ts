import { Locator, Page } from "playwright/test";
export class HomePage {

    readonly page: Page;
    readonly exampleUser: Locator;
    readonly profileField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.exampleUser = page.locator("//div[@class='relative']//span//button[contains(text(),'Example User')]");
        this.profileField = page.locator("//div[contains(@class, 'ring-black')]//a[text()='Profile']");
    }

    async clickOnUser() {
        await this.exampleUser.click();
    }

    async clickProfile() {
        await this.profileField.click();
    }
}