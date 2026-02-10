import { Page, Locator } from '@playwright/test'
export class OrderHistoryPage {
    page: Page;
    orderedProducts: Locator;
    orderIdDetail: Locator;
    rows: Locator;


    constructor(page: Page) {
        this.page = page;
        this.orderedProducts = page.locator('tbody');
        this.rows = page.locator('tbody tr')
        this.orderIdDetail = page.locator('.col-text');


    }
    async verifyOrderIdInOrderHistoryPage(orderId: any) {
        await this.orderedProducts.waitFor();

        const count = await this.rows.count();
        console.log(count);


        for (let i = 0; i < count; i++) {
            const rowOrderId = await this.rows.nth(i).locator('th').textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator('button', { hasText: 'View' }).click();
                break;
            }
        }
    }
    async getOrderId() {
        return await this.orderIdDetail.textContent();
    }
}