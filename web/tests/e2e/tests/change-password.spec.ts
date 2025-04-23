import { expect, test } from "playwright/test";
import { LoginPage } from "../pages/login-page";
import { HomePage } from "../pages/home-page";
import { ProfilePage } from "../pages/profile-page";
import { LandingPage } from "../pages/landing-page";

let profilePage: ProfilePage;
const CURRENT_PASSWORD = "Demo@123";
const NEW_PASSWORD = "Demo@1234";
const INVALID_PASSWORD = "Dem@1234";
const SHORTER_PASSWORD = "Demo@12"

test.beforeEach(async ({ page }) => {
    const landingPage = new LandingPage(page);
    await page.goto('/');
    await expect(page).toHaveTitle("Welcome - Kmbal Movies");
    await landingPage.navigateToLoginPage();
    const loginPage = new LoginPage(page);
    await loginPage.login();

    await expect(page).toHaveTitle("Log in - Kmbal Movies");
    await expect(page).toHaveURL("http://localhost:8000/movies")

    const homePage = new HomePage(page);
    await homePage.clickOnUser();
    await homePage.clickProfile();
    await expect(page).toHaveURL("http://localhost:8000/profile")

    profilePage = new ProfilePage(page);
    await expect(page).toHaveTitle("Profile - Kmbal Movies");

});

test.describe("Profile - Password Change", () => {

    test('Password validations and password change', async ({ page }) => {
        const profilePage = new ProfilePage(page);
      
        await test.step('Should show minimum length error message for new password', async () => {
            await profilePage.fillCurrentPassword(CURRENT_PASSWORD);
            await profilePage.fillNewPassword(SHORTER_PASSWORD);
            await profilePage.fillConfirmPassword(SHORTER_PASSWORD);
            await profilePage.clickOnSave();
            await expect(profilePage.passwordErrorMessage).toContainText("The password field must be at least 8 characters.");
        });

        await test.step("Should show password mismatch error message when confirm password is different ", async({})=> {
        
            await profilePage.fillCurrentPassword(CURRENT_PASSWORD);
            await profilePage.fillNewPassword(NEW_PASSWORD);
            await profilePage.fillConfirmPassword(SHORTER_PASSWORD);
            await profilePage.clickOnSave();
            await expect(profilePage.passwordErrorMessage).toContainText("The password field confirmation does not match.");
        
        })

        await test.step("Should show invalid password message when current password is wrong ", async({})=> {
        
            await profilePage.fillCurrentPassword(INVALID_PASSWORD);
            await profilePage.fillNewPassword(NEW_PASSWORD);
            await profilePage.fillConfirmPassword(NEW_PASSWORD);
            await profilePage.clickOnSave();
            await expect(profilePage.currentPasswordErrorMessage).toContainText("The password is incorrect.");
        
        })

        await test.step("Change password successfully", async({})=> {

            await profilePage.fillCurrentPassword(CURRENT_PASSWORD);
            await profilePage.fillNewPassword(NEW_PASSWORD);
            await profilePage.fillConfirmPassword(NEW_PASSWORD);
            await profilePage.clickOnSave();
            await expect(profilePage.savedMessageField).toContainText("Saved.");
        })
    });
    
});


