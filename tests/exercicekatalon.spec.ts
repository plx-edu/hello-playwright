import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Read from default ".env" file.
dotenv.config();

// Fixtures
const katalonTest = test.extend({
  homePage: async ({page}, use) => {
    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle("Automation Exercise");
    await use(page);
  },
  loginPage: async ({page}, use) => {
    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle("Automation Exercise");
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page).toHaveURL(/.*login/);
    await use(page);
  },
  authentifiedSessionPage: async ({page}, use) => {
    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle("Automation Exercise");
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page).toHaveURL(/.*login/);

    // get logged in
    const inputUsername  = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    await expect(inputUsername).toHaveAttribute('type', 'email');
    await inputUsername.fill(process.env.USER_MAIL!);
    
    const inputPassword  = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
    await expect(inputPassword).toHaveAttribute('type', 'password');
    await inputPassword.fill(process.env.USER_PASSWORD!);

    await page.locator('form').filter({ hasText: 'Login' }).getByRole('button', { name: 'Login' }).click();

    await page.getByText('Logged in as Katalon').isVisible();
    await use(page);
  }
});

// Tests
test('exercice 1', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Automation Exercise");

  // Click the get started link.
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);

  // Expects input username
  // fill username
  const inputUsername  = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
  await expect(inputUsername).toHaveAttribute('type', 'email');
  await inputUsername.fill(process.env.USER_MAIL!);
  
  // Expects input password
  // fill password
  const inputPassword  = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
  await expect(inputPassword).toHaveAttribute('type', 'password');
  await inputPassword.fill(process.env.USER_PASSWORD!);

  // Click the login button.
  await page.locator('form').filter({ hasText: 'Login' }).getByRole('button', { name: 'Login' }).click();

  // Expects to be logged in
  await page.getByText('Logged in as Katalon').isVisible();

  // Click the logout link.
  await page.getByRole('link', { name: ' Logout' }).click();
});

katalonTest('exercice 1 bis', async ({ homePage }) => {

  // Click the get started link.
  await homePage.getByRole('link', { name: ' Signup / Login' }).click();

  // Expects the URL to contain intro.
  await expect(homePage).toHaveURL(/.*login/);

  // Expects input username
  // fill username
  const inputUsername  = homePage.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
  await expect(inputUsername).toHaveAttribute('type', 'email');
  await inputUsername.fill(process.env.USER_MAIL!);
  
  // Expects input password
  // fill password
  const inputPassword  = homePage.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
  await expect(inputPassword).toHaveAttribute('type', 'password');
  await inputPassword.fill(process.env.USER_PASSWORD!);

  // Click the login button.
  await homePage.locator('form').filter({ hasText: 'Login' }).getByRole('button', { name: 'Login' }).click();

  // Expects to be logged in
  await homePage.getByText('Logged in as Katalon').isVisible();

  // Click the logout link.
  await homePage.getByRole('link', { name: ' Logout' }).click();
});

katalonTest('exercice 2', async ({ loginPage }) => {

  // Expects input username
  // fill username
  const inputUsername  = loginPage.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
  await expect(inputUsername).toHaveAttribute('type', 'email');
  await inputUsername.fill(process.env.USER_MAIL!);
  
  // Expects input password
  // fill password
  const inputPassword  = loginPage.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
  await expect(inputPassword).toHaveAttribute('type', 'password');
  await inputPassword.fill("azerty");

  // Click the login button.
  await loginPage.locator('form').filter({ hasText: 'Login' }).getByRole('button', { name: 'Login' }).click();

  // Expects login error
  // await page.getByText('').isVisible();
  await loginPage.locator('form').filter({ hasText: 'Login' }).getByText('Your email or password is incorrect!').isVisible();
});

katalonTest('exercice 3', async ({ authentifiedSessionPage }) => {

});
