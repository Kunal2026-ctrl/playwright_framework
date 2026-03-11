const {test, expect} = require('@playwright/test');

test('Checkboxes Scenarios one', async ({page}) => {
await page.goto('https://www.tutorialspoint.com/selenium/practice/check-box.php')
await page.locator('#bs_1 .plus').first().click()
await expect(page.locator('#c_bs_1')).not.toBeChecked()
await expect(page.locator('#c_bf_1')).not.toBeChecked()
await expect(page.locator('#c_bf_2')).not.toBeChecked()
console.log("First Verification Passed")

await page.locator('#c_bs_1').click()
await expect(page.locator('#c_bf_1')).toBeChecked()
await expect(page.locator('#c_bf_2')).toBeChecked()
console.log("Second Verification Passed")

await page.locator('#c_bf_1').click()
await expect(page.locator('#c_bf_1')).not.toBeChecked()
await expect(page.locator('#c_bf_2')).toBeChecked()
await expect(page.locator('#c_bs_1')).not.toBeChecked()

console.log("Third Verification Passed")

})

test('Validate check boxes in Amazon', async({page})=>
{
await page.goto('https://www.amazon.in/')
await page.locator("#twotabsearchtextbox").fill('books')
await page.locator("//input[@id ='nav-search-submit-button']").click()
//await page.waitForTimeout(5000)
await page.waitForSelector('h2.a-size-base span.a-text-bold')
await expect(page.locator("h2.a-size-base span.a-text-bold")).toContainText(/books/i)
await page.locator("//span[text()='Hardcover']").click()
console.log("Selecting Hardcover Verification Passed")

const elements  = await page.locator("div[data-cy = 'price-recipe'] a.a-text-bold").all()

//enhanced for loop
for(const element of elements)
{
    //Below both can be used
    //await expect(page.locator(element)).toContainText("Hardcover");
    await expect(element).toContainText("Hardcover");
}
console.log("Enhanced loop closed and validation done")
})