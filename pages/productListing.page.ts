import { Page } from '@playwright/test';
import { FilterCriteria } from '../types/plp-filter';

export class ProductListingPage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    readonly selectors = {
        headlineWrapper: 'div.product-overview__headline-wrapper',
        filterProductType: 'div[data-testid="classificationClassName"]',
        filterBrandName: 'div[data-testid="brand"]',
        filterPresentFor: 'div[data-testid="Geschenk für"]',
        filterGender: 'div[data-testid="gender"]',
        filterHighlights: 'div[data-testid="flags"]',
        filterCloseButton: 'button.facet__close-button',
        filterCheckbox: 'a[role="checkbox"]'
    }

    async clickOnFilterCheckbox(text: string) {
        if(text === 'any') {
            await this.page.locator(this.selectors.filterCheckbox).nth(0).click();
        } else {
            await this.page.locator(this.selectors.filterCheckbox).getByText(text).first().click();
        }
    }

    async applyFilter(filter: FilterCriteria) {
        await this.page.locator(this.selectors.headlineWrapper).hover();

        if(filter.productType && (await this.page.locator(this.selectors.filterProductType).isVisible())) {
            this.page.locator(this.selectors.filterProductType).click();
            for(const productType of filter.productType) {
                await this.clickOnFilterCheckbox(productType);
            }
            await this.page.locator(this.selectors.filterCloseButton).click();
        }

        if(filter.brand && (await this.page.locator(this.selectors.filterBrandName).isVisible())) {
            this.page.locator(this.selectors.filterBrandName).click();
            for(const brandName of filter.brand) {
                await this.clickOnFilterCheckbox(brandName);
            }
            await this.page.locator(this.selectors.filterCloseButton).click();
        }

        if(filter.gender && (await this.page.locator(this.selectors.filterGender).isVisible())) {
            this.page.locator(this.selectors.filterGender).click();
            for(const gender of filter.gender) {
                await this.clickOnFilterCheckbox(gender);
            }
            await this.page.locator(this.selectors.filterCloseButton).click();
        }

        if(filter.presentFor && (await this.page.locator(this.selectors.filterPresentFor).isVisible())) {
            this.page.locator(this.selectors.filterPresentFor).click();
            for(const presentFor of filter.presentFor) {
                await this.clickOnFilterCheckbox(presentFor);
            }
            await this.page.locator(this.selectors.filterCloseButton).click();
        }

        if(filter.highlights && (await this.page.locator(this.selectors.filterHighlights).isVisible())) {
            this.page.locator(this.selectors.filterHighlights).click();
            for(const highlight of filter.highlights) {
                await this.clickOnFilterCheckbox(highlight);
            }
            await this.page.locator(this.selectors.filterCloseButton).click();
        }
    }

    async getListedProductCount() {
        const elInnerText = await this.page.locator(this.selectors.headlineWrapper).innerText();

        const match = elInnerText.match(/[+-]?\d+(\.\d+)?/g);
        if(match) { 
            return match[0];
        }
    }
}