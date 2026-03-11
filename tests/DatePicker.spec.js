import { test, expect } from '@playwright/test';
import { cursorTo } from 'readline';

test.skip('Handling calander Date picker', async ({ page }) => {
    await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php')
    await page.locator('#dob').fill('2026-03-02')
    await expect(page.locator('#dob')).toHaveValue('2026-03-02')


    await page.waitForTimeout(5000)

})
test.skip('Handling calander Date picker  --- Way-1', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')
    //await page.waitForLoadState('networkidle')
    const frame = await page.frameLocator("(//iframe[@class='demo-frame'])[1]")
    await frame.locator('#datepicker').click();
    await frame.locator("text='12'").click()
    await expect(frame.locator('#datepicker')).toHaveValue("03/12/2026")

    await page.waitForTimeout(5000)


})

test.skip('Handling calander Date picker  --- Way-2-- Current date', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')
    // await page.waitForLoadState('networkidle')
    const frame = await page.frameLocator("(//iframe[@class='demo-frame'])[1]")
    await frame.locator('#datepicker').click();
    const date = new Date();//current date and time
    console.log(date)
    const currentDate = date.getDate(); //taking only date 
    console.log(currentDate)

    await frame.locator(`text="${currentDate}"`).click();
    //03/03/2026

    const today = new Date()
    const currentDay = today.getDate()
    console.log(currentDay)

    const currentMonth = today.getMonth() + 1
    console.log(currentMonth)

    const currentFullYear = today.getFullYear()
    console.log(currentFullYear)

    const formattedDate = `${currentDay}/${currentMonth}/${currentFullYear}`
    console.log(formattedDate)

    const datePickerValue = await frame.locator('#datepicker').inputValue()
    console.log(datePickerValue)

    const expectedDate = new Date(formattedDate)
    const actualDate = new Date(datePickerValue)

    expect(actualDate.getTime()).toBe(expectedDate.getTime())
    console.log("actualDate is matching expectedDate")

    await page.waitForTimeout(5000)


})


test('Handling calander Date picker  --- Way-3-- Random date', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')
    // await page.waitForLoadState('networkidle')
    const frame = await page.frameLocator("(//iframe[@class='demo-frame'])[1]")
    await frame.locator('#datepicker').click();


    const targetYear = 2027
    const targetMonth = "May"
    const targetDay = "2"

    while (true) {
        const displayYeatText = await frame.locator(".ui-datepicker-year").textContent() || "0"
        console.log(displayYeatText)
        const displayYear = parseInt(displayYeatText)
        console.log(displayYear)

        if (displayYear === targetYear) {
            break;
        }
        if (displayYear < targetYear) {
            await frame.locator(".ui-icon.ui-icon-circle-triangle-e").click()

        }
        else {
            await frame.locator(".ui-datepicker-prev.ui-corner-all").click()
        }

    }

    while (true) {
        const displayMonth = await frame.locator('.ui-datepicker-month').textContent()
        if (displayMonth === targetMonth) {
            break;
        }
        else {
            await frame.locator(".ui-icon.ui-icon-circle-triangle-e").click()
        }


    }

    await frame.locator(`text="${targetDay}"`).click()




})