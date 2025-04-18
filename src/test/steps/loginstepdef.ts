import {Given, Then} from "@cucumber/cucumber";
import {fixture} from "../utils/base";


Given('user launches the {string} portal', async (kmbalMovies: string) => {
    await fixture.loginPage.navigateTo();
});

Given('user enters valid credentials {string} and {string} to log in', async (email: string, password: string) => {
    await fixture.loginPage.login(email, password);

});
Given('verify user has landed on the {string} portal home page', async (kmbalMovies:string) => {
    await fixture.loginPage.verifyLoginSuccess();

});
Then('user successfully changes the password from {string} to {string}', async (currentPassword: string, newPassword: string) => {
    await fixture.loginPage.updatePassword(currentPassword, newPassword);
    await fixture.loginPage.logout();

});
