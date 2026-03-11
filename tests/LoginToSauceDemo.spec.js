import {test, expect } from "@playwright/test";
import { Login } from "./saucedemoPage/LoginPage";



test('User Login', async({page})=>
    {
        const login  = new Login(page)/// creating object to the class
        await login.navigate('https://www.saucedemo.com/')
        await login.waitForPageLoad()
        await login.loginIntoSauceDemo('standard_user', 'secret_sauce')
        console.log("Login Successfull!")
        const pageTitle = await page.title()
        console.log(pageTitle)
        await expect(page).toHaveTitle('Swag Labs')
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        await page.waitForTimeout(5000)




   })