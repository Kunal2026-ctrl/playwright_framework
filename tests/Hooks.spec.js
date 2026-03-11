import { test, chromium } from "@playwright/test";

let browser;
let page;


test.describe("Hooks", ()=>{

    test.beforeAll(async()=>{

       console.log("Launch the Browser")
       browser = await chromium.launch({headless:false})
       page = await browser.newPage()

    })

   test.afterAll(async()=>{
   console.log("Closing the brower")
   await browser.close()

   })

   test.beforeEach(async()=>
    {
       console.log("Launching the browser")
       await page.goto('https://www.google.com')
       console.log(await page.title())
   })

   test.afterEach(async()=>{
  console.log("Test Completed")

   })

   test('test -1: Search for playwright Automation', async()=>
    {
       await page.locator("textarea[aria-label = 'Search']").fill('Playwright Automation')
       await page.keyboard.press('Enter')
       console.log("First test passed")


   })
    test('test -2: JavaScript Tutorial', async()=>
    {
       await page.locator("textarea[aria-label = 'Search']").fill('JavaScript Tutorial')
       await page.keyboard.press('Enter')
       console.log("Second test passed")


   })

})
