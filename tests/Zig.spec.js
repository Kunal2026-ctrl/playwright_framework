const{test, expect} = require('@playwright/test')

test('Navigate to Browser', async({page})=>
{
await page.goto('https://www.flipkart.com/')
await page.waitForLoadState('networkidle')
//await page.pause()
const pageTitleName = await page.title()
console.log(pageTitleName)
expect(pageTitleName).toBe('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!')

}
)

//tag[@attribute='value']
//tagname[text()='value']

////input[@id='twotabsearchtextbox']

test('Amazon Navigation',async({page})=>
{
await page.goto('https://www.amazon.in/');
//await page.waitForLoadState('networkidle'); 
//The timeout error at networkidle is occurring because Amazon's page continues to make network requests (ads, analytics, etc.) and never reaches a true "network idle" state within your 40-second timeout.
await page.waitForLoadState('domcontentloaded');
const pageTitle = await page.title();
console.log(pageTitle);
console.log('Title length:', pageTitle.length);
console.log('Actual page title:', pageTitle);
//expect(pageTitle).toContain('Amazon');
await page.locator("//input[@id='twotabsearchtextbox']").fill("Macbook");
await page.locator("//input[@id='nav-search-submit-button']").click();
await page.waitForTimeout(5000);
await page.locator("//a[text()='Mobiles']").click();
await page.waitForTimeout(5000);

})

//--debug  
// By default it open the brower in headed mode
//it opens the playwright inspector and we can debug line by line code
// we have also option for pick locators and it will give the locator for that
// We have also record option, we can record the steps and it gives the scripts for us



// codegen .... using this we can record all the activities and it will provide us scripts
//npx playwright codegen