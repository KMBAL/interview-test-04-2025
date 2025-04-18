import { Page } from "@playwright/test";

export default class HelperPage {
    constructor(public page: Page) {}

    /*********method to customise x-path and identify based on text provided in the code**********/
    async getElementWithTextAndClick(tagName: string, text: string): Promise<void> {
        // const element = page.locator(`${tagName}:has-text("${text}")`);
        const element = this.page.locator(`//${tagName}[text()="${text}"]`);
        await element.first().click();
    }


    /*********Reusable xpath to click on the label**********/
    async clickByLabel(label: string, labelText: string): Promise<void> {
        const locator = `${label}[normalize-space()='${labelText}']`;
        await this.page.click(locator,{force:true});
    }



}