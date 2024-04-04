import { Page } from '@playwright/test';

export class MainPage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://www.douglas.de/de';
    }

    readonly selectors = {
        acceptAllCookieConsent: 'button.uc-list-button__accept-all',
        menuItem: 'a.navigation-main-entry__link',
    }

    async initTest() {
        await this.page.goto(this.baseUrl);
        await this.cookieConsent();
    }

    async cookieConsent() {
        await this.page.locator(this.selectors.acceptAllCookieConsent).click();
    }

    async clickOnMenu(linkText: string) {
        await this.page.getByText(linkText).click();
    }

    async clickOnMenuByIndex(index: number) {
        await this.page.locator(this.selectors.menuItem).nth(index).click();
    }
}