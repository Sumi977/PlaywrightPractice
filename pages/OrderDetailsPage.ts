import { expect, Page, Locator } from '@playwright/test';
export class OrderDetailsPage {
    page: Page;
    orderConfirmMessage: Locator;
    ordersLink: Locator;
    orderNum: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderConfirmMessage = page.locator("[class*='hero']");
        this.ordersLink = page.locator("[routerlink*='myorders']").first();
        this.orderNum = page.locator('.em-spacer-1 .ng-star-inserted');



    }
    async verifyOrderConfirmmessage() {
        await expect(this.orderConfirmMessage).toHaveText(' Thankyou for the order. ');
        const text = await this.orderNum.textContent();
        return text?.trim();

    }

    async navigateToOrdersLink() {
        await this.ordersLink.click();
    }

}