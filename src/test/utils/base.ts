import { LoginPage } from "../pages/loginPage";

export const fixture = {
    loginPage: undefined as unknown as LoginPage,
};


export function initializePages(page: any) {
    fixture.loginPage = new LoginPage(page);

}
