import { expect, Page, Locator } from '@playwright/test'
import { OrderDetailsPage } from '../pages/OrderDetailsPage'
export class PlaceOrderPage {
    page: Page;
    countryInputbox: Locator;
    countryList: Locator;
    emailField: Locator;
    placeOrderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryInputbox = page.locator("[placeholder='Select Country']");
        this.countryList = page.locator("[class*='ta-results'] ");
        this.emailField = page.locator(".user__name [type='text']").first();
        this.placeOrderBtn = page.getByText('Place Order ');

    }

    async searchAndSelectCountry() {
        await this.countryInputbox.pressSequentially('uni', { delay: 1000 });
        await this.countryList.last().waitFor();

        const count = await this.countryList.locator('button').count();
        console.log(count);

        for (let i = 0; i < count; i++) {
            const countryNames = await this.countryList.locator('button').nth(i).textContent();
            console.log(countryNames);

            if (countryNames === ' United States') {
                await this.countryList.locator('button').nth(i).click();
                break;


            }

        }
    }
    async verifyEmail(username: string) {
        await expect(this.emailField).toContainText(username);

    }

    async placeOrder() {
        await this.placeOrderBtn.click();
        return new OrderDetailsPage(this.page);
    }



}