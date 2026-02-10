import { test, expect, Page, Locator } from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage';
export class LoginPage {
    page: Page;
    userEmailTextbox: Locator;
    passwordTextbox: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userEmailTextbox = page.locator('#userEmail');
        this.passwordTextbox = page.locator('#userPassword');
        this.loginButton = page.locator('#login')
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(username: string, password: string) {
        await this.userEmailTextbox.fill(username)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click();
        return new DashboardPage(this.page);

    }


}