import { expect, test } from "playwright/test";
import { LoginPage } from "../pages/login-page";
import { LandingPage } from "../pages/landing-page";

const USER_NAME = "example@user.com";
const PASSWORD = "Demo@123";
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    const landingPage = new LandingPage(page);
    await page.goto('/');
    await expect(page).toHaveTitle("Welcome - Kmbal Movies");
    await landingPage.navigateToLoginPage();
    loginPage = new LoginPage(page);
});

test.describe("Login tests", () => {
    test("Successful login wth valid credentials", async({page})=> {
        
        await loginPage.fillUserName(USER_NAME);
        await loginPage.fillPassword(PASSWORD)
        
        await loginPage.clickOnLogin();
    
        await expect(page).toHaveTitle("Log in - Kmbal Movies");
        await expect(page).toHaveURL("http://localhost:8000/movies")
    
    })
    
    test("Unsuccessful login wth invalid credentials", async({})=> {
    
        await loginPage.fillUserName("invalid@user.com");
        await loginPage.fillPassword(PASSWORD)
        await loginPage.clickOnLogin();
    
        await expect(loginPage.invalidLoginMessageField).toContainText("These credentials do not match our records.");
    
    })
    
    test("Mandatory validation message should show for password", async({})=> {
    
        await loginPage.fillUserName(USER_NAME);
        await loginPage.fillPassword("")
        await loginPage.clickOnLogin();
    
        await expect(loginPage.passwordErrorMessageField).toContainText("The password field is required.");
    
    })
    
    test("Mandatory validation message should show for email", async({})=> {
    
        await loginPage.fillUserName("");
        await loginPage.fillPassword(PASSWORD)
        await loginPage.clickOnLogin();
    
        await expect(loginPage.invalidLoginMessageField).toContainText("The email field is required.");
    
    })
    
});

