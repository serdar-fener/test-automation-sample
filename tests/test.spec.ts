import { expect, test } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { ProductListingPage } from '../pages/productListing.page';
import { perfumFilterCriterias } from '../test-data/perfum-filter-data';

let mainPage: MainPage;
let productListingPage: ProductListingPage;

test.beforeEach(async ({ page, context }) => {
    mainPage = new MainPage(page);
    productListingPage = new ProductListingPage(page);

    await mainPage.initTest();
});

test.describe('Test Suite', () => {
    for(const filterTest of perfumFilterCriterias) {
        test(`Test for criteria: ${filterTest.testName}`, async ({ page }) => {
            await mainPage.clickOnMenuByIndex(2);
    
            const productCountBefore = await productListingPage.getListedProductCount();
            await productListingPage.applyFilter(filterTest.filterValues);

            const productCountAfter = await productListingPage.getListedProductCount();
            expect(productCountBefore).not.toBe(productCountAfter);
        });
    }
});
