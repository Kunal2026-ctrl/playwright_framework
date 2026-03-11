const{test, expect} = require('@playwright/test')

test('Assertions', async({page})=>
{
await page.goto('https://www.saucedemo.com/')
const pageTitle = await page.title()
console.log(pageTitle)
//validating the page title to be 'Swag Labs' using Playwright's expect API 
await expect(pageTitle).toBe('Swag Labs')  
//Ensures the page has the given title.
await expect(page).toHaveTitle("Swag Labs")
//Ensures the page is navigated to the given URL.
await expect(page).toHaveURL("https://www.saucedemo.com/")
const logoName = await page.locator(".login_logo")
//Ensures that Locator points to an attached and visible DOM node.
await expect(logoName).toBeVisible()
const usernameVisibility = await page.locator("#user-name")
//'Ensures the Locator points to an enabled element.
await expect(usernameVisibility).toBeEnabled()
//Ensures the Locator points to an element with the given text.
const usernames = await page.locator("#login_credentials h4")
expect(usernames).toHaveText("Accepted usernames are:")
console.log("All assertions passed!")
//toContainText  - checks for the partial match.
const passwords = await page.locator(".login_password h4")
expect(passwords).toContainText("all")

//Lets login 
await page.locator("#user-name").fill("standard_user")
await page.locator("#password").fill("secret_sauce")
await page.locator("#login-button").click()
console.log("Login Successful!")
})