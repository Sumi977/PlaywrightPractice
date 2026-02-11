import { test, expect } from '@playwright/test';




test('login with valid credential', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator('#userEmail').fill('johnsmith26@gmail.com');

    await page.getByPlaceholder('enter your passsword').fill('Learning@26');

    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForTimeout(3000);
});

