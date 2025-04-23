import { Locator, Page } from "playwright/test";

export class ProfilePage {

    readonly page: Page;
    readonly currentPassword : Locator ;
    readonly newPassword : Locator;
    readonly confirmPassword : Locator;
    readonly saveButton : Locator;
    readonly savedMessageField: Locator;
    readonly passwordErrorMessage: Locator;
    readonly currentPasswordErrorMessage: Locator;


    constructor(page: Page) {
        this.page =page;
        this.currentPassword = page.locator('#current_password');
        this.newPassword = page.locator('#password');
        this.confirmPassword = page.locator('#password_confirmation');
        this.saveButton = page.locator("//input[@id='password']/ancestor::form//button")
        this.savedMessageField = page.locator("//input[@id='password']/ancestor::form//button/parent::div//p")
        this.passwordErrorMessage = page.locator("//input[@id='password']/parent::div//p")
        this.currentPasswordErrorMessage = page.locator("//input[@id='current_password']/parent::div//p")

    }

    async fillCurrentPassword(currentPassword: string){
        await this.currentPassword.fill(currentPassword);
    }

    async fillNewPassword(newPassword: string){
        await this.newPassword.fill(newPassword);
    }

    async fillConfirmPassword(newPassword: string){
        await this.confirmPassword.fill(newPassword);
    }

    async clickOnSave(){
        await this.saveButton.click();
    }   
}