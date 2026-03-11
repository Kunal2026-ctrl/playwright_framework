import {test, expect, page, chromium } from "@playwright/test";

test('Multiple tabs', async({page: Page})=>{
const brower = await chromium.launch({headless: false})
const context = await brower.newContext()
const page = await context.newPage()

await page.goto('https://demoqa.com/')
await page.locator("text= Alerts, Frame & Windows").click()
await page.locator("text = Browser Windows").click()

const [newTab] = await Promise.all([
page.waitForEvent("popup"),
await page.locator('#tabButton').click()

])

await newTab.waitForLoadState()
console.log("New Tab url: ", newTab.url())
await page.waitForTimeout(5000)

})


test('Multiple Window', async({page: Page})=>{
const brower = await chromium.launch({headless: false})
const context = await brower.newContext()
const page = await context.newPage()

await page.goto('https://demoqa.com/')
await page.locator("text= Alerts, Frame & Windows").click()
await page.locator("text = Browser Windows").click()

const [newWindow] = await Promise.all([
context.waitForEvent("page"),
await page.locator('#windowButton').click()

])

await newWindow.waitForLoadState()
console.log("New Window url: ", newWindow.url())
await page.waitForTimeout(5000)
console.log("Multiple Window validation done")

})

