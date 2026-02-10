import { test, expect, Page, Locator } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

export class DashboardPage {
    page: Page;
    products: Locator;
    productsText: Locator;
    headerText: Locator;
    cart: Locator;


    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.headerText = page.locator("[class*='left'] p");
        this.cart = page.locator("[routerlink*='/cart']");

    }

    async addToCart(productName: string) {
        await this.productsText.last().waitFor();
        console.log(await this.products.locator('b').allTextContents());
        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('button', { hasText: 'Add To Cart' }).click();
                break;

            }
        }

    }
    async verifyHeaderText(text: string) {
        await this.headerText.waitFor();
        console.log(await this.headerText.textContent());
        await expect(this.headerText).toContainText(text);

    }
    async navigateToCart() {
        await this.cart.click();
        return new CartPage(this.page);

    }

}