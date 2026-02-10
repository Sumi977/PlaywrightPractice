import { expect, Page, Locator } from '@playwright/test'
export class CartPage {
    page: Page;
    cartListItems: Locator;
    checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartListItems = page.locator('.cart h3');
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });

    }

    async verifyAddedProductInCart(productName: string) {

        if (await this.cartListItems.textContent() === productName) {
            await this.checkoutBtn.click();
        }


    }


}