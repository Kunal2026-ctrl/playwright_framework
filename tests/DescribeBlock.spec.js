import { test, expect } from '@playwright/test';


test.describe("Login Functionallity", () => 
{
    test('Valid Credentials', async ({ page }) => 
    {
     await page.goto('https://www.saucedemo.com/')
     await page.locator('#user-name').fill('standard_user')
     await page.locator('#password').fill('secret_sauce')
     await page.locator('#login-button').click()
     await page.waitForTimeout(5000)
     console.log("Successfull Login !")

     const productPageName = await page.locator('.title').textContent()
     console.log(productPageName)
     await expect(page.locator('.title')).toHaveText('Products')  
     console.log("Product page name validated")

    })

    test('In -Valid Credentials', async ({ page }) => 
    {
     await page.goto('https://www.saucedemo.com/')
     await page.locator('#user-name').fill('standard_user1')
     await page.locator('#password').fill('secret_sauce')
     await page.locator('#login-button').click()
     await page.waitForTimeout(3000)
     await page.waitForSelector("h3[data-test = 'error']")

     const errorMessage = await page.locator("h3[data-test = 'error']").textContent()
     console.log(errorMessage)
     await expect(page.locator("h3[data-test = 'error']")).toContainText('password do not match')
     console.log("Message validated")
     

    })

})

test.describe("Product Page", ()=>{

    test('Add Product', async({page})=>{
     await page.goto('https://www.saucedemo.com/')
     await page.locator('#user-name').fill('standard_user')
     await page.locator('#password').fill('secret_sauce')
     await page.locator('#login-button').click()
     await page.waitForTimeout(5000)
     console.log("Successfull Login !")

     const productPageName = await page.locator('.title').textContent()
     console.log(productPageName)
     await expect(page.locator('.title')).toHaveText('Products')  
     console.log("Product page name validated")

     //add to cart
     await page.locator('#add-to-cart-sauce-labs-backpack').click()

    })

})

test.describe("Cart Page Functionallity", ()=>
{
  test('Validate cart page', async({page})=>{

await page.goto('https://www.saucedemo.com/')
     await page.locator('#user-name').fill('standard_user')
     await page.locator('#password').fill('secret_sauce')
     await page.locator('#login-button').click()
     await page.waitForTimeout(5000)
     console.log("Successfull Login !")

     await expect(page.locator('.title')).toHaveText('Products')  
     console.log("Product page name validated")

     //add to cart
     await page.locator('#add-to-cart-sauce-labs-backpack').click()
     // click on cart button
     await page.locator('.shopping_cart_link').click()
     await page.waitForTimeout(4000)
     await page.waitForSelector('.title')
     await expect(page.locator('.title')).toHaveText('Your Cart')
     console.log("Cart page Message located")

     await expect(page.locator('#continue-shopping')).toHaveText('Continue Shopping')
     console.log("Continue Shopping page message pop up")
     

  })

   test('Validate check out page', async({page})=>{

await page.goto('https://www.saucedemo.com/')
     await page.locator('#user-name').fill('standard_user')
     await page.locator('#password').fill('secret_sauce')
     await page.locator('#login-button').click()
     await page.waitForTimeout(5000)
     console.log("Successfull Login !")

     await expect(page.locator('.title')).toHaveText('Products')  
     console.log("Product page name validated")

     //add to cart
     await page.locator('#add-to-cart-sauce-labs-backpack').click()
     // click on cart button
     await page.locator('.shopping_cart_link').click()
     await page.waitForTimeout(4000)
     await page.waitForSelector('#checkout')

     await expect(page.locator('#checkout')).toHaveText('Checkout')
     console.log("Checkout message button validated")
     

  })



})