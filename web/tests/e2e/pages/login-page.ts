import { Locator, Page } from "playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly loginButton: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly invalidLoginMessageField: Locator;
    readonly passwordErrorMessageField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator("//button[text()='Log in']");
        this.invalidLoginMessageField = page.locator("//input[@id='email']/parent::div//p");
        this.passwordErrorMessageField = page.locator("//input[@id='password']/parent::div//p");

    }

    async clickOnLogin() {
        await this.loginButton.click();
    }

    async fillUserName(userName: string) {
        await this.emailField.fill(userName);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async login() {
        await this.emailField.fill("example@user.com");
        await this.passwordField.fill("Demo@123");
        await this.loginButton.click();
    }
}
