import {test, example} from '@playwright/test'
import path from 'path'

test.skip('Screenshots', async({page})=>{

await page.goto('https://www.amazon.in/')
//await page.waitForLoadState('networkidle')
await page.waitForTimeout(5000)
await page.screenshot({path: 'amaz.png'})

})

//storing all the screenshots at folder location
test.skip('Screenshots -- Folder Location', async({page})=>{

await page.goto('https://www.amazon.in/')
//await page.waitForLoadState('networkidle')
await page.waitForTimeout(5000)
//await page.screenshot({path: 'Screenshots/amaz.png'}) // it will take visible part of the web page screenshots
await page.screenshot({path: 'Screenshots/amaz1.png', fullPage : true}) // it will take full web page screenshots
// with timestamp we can generate unique 
await page.screenshot({path : `Screenshots/amazon - ${Date.now()}.png`})// current time stamp

})


//twotabsearchtextbox
//take screenshot of a particular locators
test.skip('Screenshots -- element/locator', async({page})=>{

await page.goto('https://www.amazon.in/')

const element = page.locator('#twotabsearchtextbox')
await element?.screenshot({path : 'Screenshots/new.jpg'})

})


test('Record on Failure', async({page})=>{

await page.goto('https://www.amazon.in/')

await page.locator('#twotabsearchtextbox1').fill('book')
await page.close()
})