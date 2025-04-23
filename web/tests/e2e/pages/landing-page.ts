import { Locator, Page } from "playwright-core";

export class LandingPage {

    readonly page : Page;
    readonly loginButton : Locator;

    constructor(page: Page) {
        this.page =page;
        this.loginButton = page.locator("//div[@id='app']//div//a[contains(text(),'Log in')]");
    }

    async navigateToLoginPage() {
        await this.loginButton.click();
    }
}