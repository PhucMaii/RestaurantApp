// @ts-check
import { test, expect } from '@playwright/test';

test('Customer Login Flow Testing ', async ({ page}) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', {name: 'Order food'}).click();
  await expect(page.getByRole('heading', { name: 'Sign In To Your Account' })).toBeVisible();

  const signinData = {
    email: 'maithienphuc0102@gmail.com',
    password: 'test123'
  }
  await page.getByPlaceholder('Enter your email...').fill(signinData.email);
  await page.getByPlaceholder('Enter your password...').fill(signinData.password);
  await page.getByRole('button', { name: 'Sign in'}).click();
  await expect(page.getByRole('heading', { name: 'Grab & Go'})).toBeVisible();
})

test('Customer Signup Flow Testing', async ({ page }) => {
  await page.goto('http://localhost:5173/customer/auth/signup');
  await expect(page.getByRole('heading', { name: 'Let\'s Create Your Account' })).toBeVisible();

  const createAccountData = {
    name: 'Michael',
    email: 'michael@gmail.com',
    password: 'michael123',
    address: '1805 Sixth Avenue'
  }
  await page.getByPlaceholder('Enter your email...').fill(createAccountData.email);
  await page.getByLabel('Password', { exact: true }).fill(createAccountData.password);
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(createAccountData.password);
  await page.getByRole('button', { name: "Continue", exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Last Step'})).toBeVisible();
  
  await page.getByPlaceholder('Enter your name...').fill(createAccountData.name);
  await page.getByLabel('Address').fill(createAccountData.address);
  await page.getByRole('option', { name: '1805Sixth Avenue New Westminster, BC, Canada'}).click();
  await page.getByRole('button', { name: 'Sign up'}).click();
  await expect(page.getByRole('heading', { name: 'Sign In To Your Account' })).toBeVisible();
})