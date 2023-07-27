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

    await expect(page.getByText('Logged in as Katalon')).toBeVisible();
    await use(page);
  },
  // logoutAction: async ({page}, use) => {
  //   await page.getByRole('link', { name: ' Logout' }).click();
  // }
});

// Tests
test.skip('exercice 1', async ({ page }) => {
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
  await expect(page.getByText('Logged in as Katalon')).toBeVisible();
  
  
  // Click the logout link.
  await page.getByRole('link', { name: ' Logout' }).click();
  await expect(page.getByText('Logged in as Katalon')).toBeHidden();
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
  await expect(homePage.getByText('Logged in as Katalon')).toBeVisible();
  
  // Click the logout link.
  await homePage.getByRole('link', { name: ' Logout' }).click();
  await expect(homePage.getByText('Logged in as Katalon')).toBeHidden();
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
  await expect(loginPage.locator('form').filter({ hasText: 'Login' }).getByText('Your email or password is incorrect!')).toBeVisible();
});

katalonTest('exercice 3', async ({ authentifiedSessionPage: page }) => {
  await page.getByRole('link', { name: ' Contact us' }).click();
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();

  const inputLocator = page.locator('form').filter({ hasText: 'Submit' });
  await inputLocator.getByPlaceholder('Email', { exact: true }).fill(process.env.USER_MAIL!);
  await inputLocator.getByPlaceholder('Your Message Here').fill('Hello Contact');
  
  page.on('dialog', dialog => dialog.accept());
  await inputLocator.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();

  
  // Click the logout link.
  await page.getByRole('link', { name: ' Logout' }).click();
  await expect(page.getByText('Logged in as Katalon')).toBeHidden();

  // await inputUsername.fill(process.env.USER_MAIL!);
  // getByRole('heading', { name: 'Get In Touch' })
  // getByPlaceholder('Name')
  // getByPlaceholder('Subject')
  // getByPlaceholder('Your Message Here')
  // getByRole('button', { name: 'Submit' })
});
