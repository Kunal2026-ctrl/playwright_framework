const {test, expect} = require('@playwright/test');

test('Assertions one', async ({page}) => {
await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
await page.locator('#name').fill('Kunal');
await page.locator('#email').fill('kunal@gmail.com');
//Ensures the Locator points to an element with the given input value.
await expect(page.locator('#name')).toHaveValue("Kunal");
await expect.soft(page.locator('#email')).toHaveValue("kunal@gmail.com");
await page.locator('#gender').check()
await expect(page.locator('#gender')).toBeChecked() 
await page.waitForTimeout(5000)

})