import { test, expect } from '@playwright/test';
import { Console } from 'console';


test.skip('Validation of Handling Frames by Name', async ({ page }) => {

    await page.goto('https://testpages.eviltester.com/pages/embedded-pages/frames/')
    const numberOfFrames = await page.frames()
    console.log('Number of Frames present on the webpage :', numberOfFrames.length)

    //by using name or url
    const frame1 = page.frame({ name: 'left' })
    if (frame1) {
        const ele = await frame1.waitForSelector("h1", { state: 'visible' })
        const test = await frame1.locator("h1")
        await expect(test).toHaveText("Left")
        console.log("Frame with name 'left' found")
    }
    else {
        console.log("Frame with name 'left' not found")
    }

})
///frame-includes/middle.html

test.skip('Validation of Handling Frames by URL', async ({ page }) => {

    await page.goto('https://testpages.eviltester.com/pages/embedded-pages/frames/')
    const numberOfFrames = await page.frames()
    console.log('Number of Frames present on the webpage :', numberOfFrames.length)

    //print all the URL's present in the webpage
    numberOfFrames.forEach(frame => {
        console.log(frame.url())

    })
    const frame2 = page.frame({ url: 'frame-includes/middle.html' })
    if (frame2) {
        const ese1 = await frame2.waitForSelector("h1", { state: 'visible' })
        const text = await frame2.locator("h1")
        await expect(text).toHaveText("Middle")
        console.log("Frame with name 'Middle' found")
    }
    else {
        console.log("Frame with URL not found on the page")
    }

})

test.skip('Validation of Handling Frames by Index', async ({ page }) => {

    await page.goto('https://testpages.eviltester.com/pages/embedded-pages/frames/')
    const numberOfFrames = await page.frames()
    const frame3 = numberOfFrames[2];
    frame3.forEach(frame => {
    console.log(frame.url())

    })

    })

    test('Nasted frame validation', async ({ page }) => {
    await page.goto('https://play1.automationcamp.ir/frames.html')
    const parentFrame = page.frameLocator("#frame1")
    const childFrame = parentFrame.frameLocator("#frame2")
    await childFrame.locator("#click_me_2").click()
    await expect(childFrame.locator("#click_me_2")).toHaveText("Clicked")
    await page.waitForTimeout(5000)
    console.log("Nasted frame validation passed")
    


    })