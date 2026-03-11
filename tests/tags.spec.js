import{test, expect} from '@playwright/test';

test('OverView page, @Regression', async({page})=>{
 await page.goto('https://www.saucedemo.com/')
 await page.locator('#user-name').fill('standard_user')
 await page.locator('#password').fill('secret_sauce')
 await page.locator('#login-button').click()
})

test('Google Search, @Regression', async({page})=>{
await page.goto('https://www.google.com/')

await page.locator("textarea[aria-label = 'Search']").fill('Playwright Automation')
await page.keyboard.press('Enter')
await page.waitForTimeout(5000)
console.log("Google Search passed")
})


test('Amazon Search, @Smoke', async({page})=>{
await page.goto('https://www.amazon.in/')
await page.locator("#twotabsearchtextbox").fill('books')
await page.locator("//input[@id ='nav-search-submit-button']").click()
await page.waitForTimeout(5000)
console.log("Amazon Search passed")
})

test('Flipkart Search, @Regression', async({page})=>{
await page.goto('https://www.flipkart.com/')
await page.locator("#twotabsearchtextbox").fill('books')
await page.locator("//input[@id ='nav-search-submit-button']").click()
await page.waitForTimeout(5000)
console.log("Flipkart Search passed")
})

