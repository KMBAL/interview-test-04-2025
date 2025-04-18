import { Page, expect } from '@playwright/test';
import { envConfig } from "../envconfig/environments";
import HelperPage from "./helperPage";

export class LoginPage extends HelperPage {
    private helper: HelperPage;

    constructor(public page: Page) {
        super(page);
        this.helper = new HelperPage(page);
    }

    // Login page locators
    private readonly email = "#email";
    private readonly password = "#password";
    private readonly remember = "//input[@name='remember']";

    // Profile page locators
    private readonly btnProfileMenu = "//span[contains(@class,'inline-flex rounded')]//button[contains(@class,'inline-flex')]";
    private readonly profileHeader = "//h2[normalize-space()='Profile']";
    private readonly txtCurrentPassword = "#current_password";
    private readonly txtNewPassword = "#password";
    private readonly txtConfirmPassword = "#password_confirmation";
    private readonly btnSavePassword = "(//button[normalize-space()='Save'])[2]";

    // Navigate to the page
    async navigateTo(): Promise<void> {
        await this.page.goto(envConfig.kmbalurl);
    }

    // Login with provided credentials
    async login(email: string, password: string): Promise<void> {
        await this.page.getByText('Log in').click();
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.remember);
        await this.page.getByText('Log in').click();
    }

    // Verify successful login
    async verifyLoginSuccess(): Promise<void> {
        await this.page.locator('a', { hasText: 'Movies' }).nth(0).waitFor({ state: 'visible' });
        const currentUrl = await this.page.url();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toBe(envConfig.kmbalurl + '/movies');
    }

    // Update the user password
    async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
        await this.page.locator('a', { hasText: 'Movies' }).nth(0).waitFor({ state: 'visible' });
        await this.page.click(this.btnProfileMenu);
        await this.page.locator('a', { hasText: 'Profile' }).nth(0).click();
        await this.page.locator(this.profileHeader).waitFor({ state: 'visible' });

        const currentUrl = await this.page.url();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toBe(envConfig.kmbalurl + '/profile');

        await this.page.fill(this.txtCurrentPassword, currentPassword);
        await this.page.fill(this.txtNewPassword, newPassword);
        await this.page.fill(this.txtConfirmPassword, newPassword);
        await this.page.click(this.btnSavePassword);
    }

    // Logout from the profile
    async logout(): Promise<void> {
        await this.page.click(this.btnProfileMenu);
        await this.page.locator('button.text-start', { hasText: 'Log Out' }).click();
    }
}

