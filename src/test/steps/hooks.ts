import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { fixture, initializePages } from "../utils/base";

let browser: Browser;
let page: Page;

Before(async (scenario) => {
    console.log(`Scenario starting: ${scenario.pickle.name}`);
    browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
        args: ['--start-maximized']
    });

    const context = await browser.newContext({
        viewport: null,
    });
    page = await context.newPage();
    initializePages(page);
    (fixture as any).page = page;
});

After(async (scenario) => {
    console.log(`Scenario finished: ${scenario.pickle.name}`);
    await browser.close();
});
