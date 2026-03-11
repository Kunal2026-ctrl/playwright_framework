import { test, expect } from '@playwright/test';

test.skip('Keyboard Action', async ({ page }) => {
    await page.goto('https://www.flipkart.com/')
    await page.waitForLoadState('networkidle')
    await page.getByPlaceholder('Search for Products, Brands and More')
    await page.keyboard.type("Laptop")//type the text
    await page.keyboard.press('Enter')//Press Enter

    await page.keyboard.press('Backspace')//
    await page.keyboard.press('Control+A')

    await page.waitForTimeout(5000)


})



test.skip('Keyboard Action - Select-Copy and Paste', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php')
    await page.getByPlaceholder('First Name').focus()
    await page.keyboard.type("Hello Ram")
    await page.keyboard.press('Control+A')
    console.log("Select")
    await page.waitForTimeout(3000)
    await page.keyboard.press('Control+C')
    console.log("Copy")
    await page.waitForTimeout(3000)

    await page.getByPlaceholder('name@example.com').focus()
    await page.keyboard.press('Control+V')
    console.log("Paste")

    await page.waitForTimeout(5000)
    console.log("Done")
})

test('Keyboard Action - Capital Letter', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php')
    await page.getByPlaceholder('First Name').focus()
    await page.keyboard.down('Shift'); 
    await page.keyboard.press('A'); 
    await page.keyboard.up('Shift');
    await page.waitForTimeout(5000)
    console.log("Done dana done")
    


})