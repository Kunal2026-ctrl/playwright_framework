const {test, expect} = require('@playwright/test');
const { title } = require('process');

test.skip('First Test', async ({page}) => 
    {
    
        await page.goto('https://www.google.com/');
        await page.waitForLoadState('networkidle');
        const title = await page.title();
        console.log(title);
        expect(title).toContain('Google');
        await page.locator('#APjFqb').fill('Kunal');
        await page.locator('//div[@class="FPdoLc lJ9FBc"]//input[@name="btnK"]').click();
        await page.pause();


    });

test.skip('Second Test Back and Forward', async ({page}) => 
    {
        await page.goto('https://www.google.com/');
        await page.pause();
        await page.waitForLoadState('networkidle');
        const title = await page.title();
        console.log(title);
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        const title1 = await page.title();
        console.log(title1);
        await page.goBack();
        await page.goForward();

    });


