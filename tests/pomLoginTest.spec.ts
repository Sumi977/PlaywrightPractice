import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { CartPage } from '../pages/CartPage'
import { PlaceOrderPage } from '../pages/PlaceOrderPage'
import { OrderDetailsPage } from '../pages/OrderDetailsPage'
import { OrderHistoryPage } from '../pages/OrderHistoryPage'


const username = 'johnsmith26@gmail.com';
const password = 'Learning@26';
const productName = 'iphone 13 pro';






test('add to cart and place order test', async ({ page }: { page: Page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(username, password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyHeaderText('Automation Practice');
    await dashboardPage.addToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = new CartPage(page);

    await cartPage.verifyAddedProductInCart(productName);

    const placeOrderPage = new PlaceOrderPage(page);

    await placeOrderPage.searchAndSelectCountry();
    await placeOrderPage.verifyEmail(username);
    await placeOrderPage.placeOrder();

    const orderDetailsPage = new OrderDetailsPage(page);

    const orderId = await orderDetailsPage.verifyOrderConfirmmessage();
    console.log(orderId);
    await orderDetailsPage.navigateToOrdersLink();

    const orderHistoryPage = new OrderHistoryPage(page);
    await orderHistoryPage.verifyOrderIdInOrderHistoryPage(orderId);







})








