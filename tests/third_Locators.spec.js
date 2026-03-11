const {test, expect} = require('@playwright/test');

test('Usecases for Locators', async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//await page.pause();
const title = await page.title();
console.log(title);
// Locators using CSS
await page.locator('input#username').fill('Kunal');
await page.locator('#password').fill('123456');
await page.locator('#signInBtn').click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await expect('success').toBeTruthy();




console.log("Happy Ending");
})

test('usecase for more locators',async({page})=>{
    await page.goto('https://tz.mis.amdocs.com/weekly-report');
    await page.waitForLoadState('networkidle');
    const timeSheetTitle = await page.title();
    console.log(timeSheetTitle);

})

test('Random test', async({page})=>{
    await page.goto('https://copilot.microsoft.com/');
    await page.waitForLoadState('networkidle');
    const randtitle = await page.title();
    console.log(randtitle);
    await browser.close();
    await page.locator('').click(); 
    await page.locator('').check();
   
  
})
