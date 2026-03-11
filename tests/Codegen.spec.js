import { test, expect } from '@playwright/test';

test('testing', async ({ page }) => {
   await page.viewportSize({ width: 400, height: 400 });
  await page.goto('https://www.amazon.in/');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('macbook');
  await page.getByRole('button', { name: 'macbook air m4', exact: true }).click();
  
});

