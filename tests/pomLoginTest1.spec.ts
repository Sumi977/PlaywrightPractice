import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { CartPage } from '../pages/CartPage'
import { PlaceOrderPage } from '../pages/PlaceOrderPage'
import { OrderDetailsPage } from '../pages/OrderDetailsPage'
import { OrderHistoryPage } from '../pages/OrderHistoryPage'

const dataSet = JSON.parse(JSON.stringify(require('../utils/testData.json')));


for (const data of dataSet) {
    test(`add to cart and place order test ${data.productName}`, async ({ page }: { page: Page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(data.username, data.password);

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.verifyHeaderText('Automation Practice');
        await dashboardPage.addToCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = new CartPage(page);

        await cartPage.verifyAddedProductInCart(data.productName);

        const placeOrderPage = new PlaceOrderPage(page);

        await placeOrderPage.searchAndSelectCountry();
        await placeOrderPage.verifyEmail(data.username);
        await placeOrderPage.placeOrder();

        const orderDetailsPage = new OrderDetailsPage(page);

        const orderId = await orderDetailsPage.verifyOrderConfirmmessage();
        console.log(orderId);
        await orderDetailsPage.navigateToOrdersLink();

        const orderHistoryPage = new OrderHistoryPage(page);
        await orderHistoryPage.verifyOrderIdInOrderHistoryPage(orderId);
        const expectedOrderId = await orderHistoryPage.getOrderId();
        console.log(expectedOrderId);
        expect(orderId).toContain(expectedOrderId);





    })
}









