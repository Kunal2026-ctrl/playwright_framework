const {test, expect} = require('@playwright/test');

test('Assertions one', async ({page}) => {
await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
await page.locator('#headingOne .accordion-button.collapsed').click()
await page.getByText(' Text Box').click()
const pageTitle01 = await page.title();
console.log(pageTitle01)
await expect(page).toHaveTitle("Selenium Practice - Text Box")
await expect(page.locator("#TextForm h1")).toHaveText("Text Box")

//now filling form
await page.getByPlaceholder('Full Name').fill('Kunal')
await page.getByPlaceholder('name@example.com').fill('kunal@example.com')
await page.getByPlaceholder('Currend Address').fill('Kunal, India')
await page.locator('#password').fill('123456')
await page.locator('.btn.btn-primary').click()
await page.waitForTimeout(5000)


})

//This field is required.
test('Assertions for Error Message', async ({page}) => {
await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
await page.locator('#headingOne .accordion-button.collapsed').click()
await page.getByText(' Text Box').click()
const pageTitle01 = await page.title();
console.log(pageTitle01)
await expect(page).toHaveTitle("Selenium Practice - Text Box")
await expect(page.locator("#TextForm h1")).toHaveText("Text Box")
await page.locator('.btn.btn-primary').click()

//await expect(page.getByLabel("This field is required.")).toBeAttached();
await expect(page.locator('#fullname-error')).toBeAttached();
const errorLebel = await page.locator('#fullname-error')
const errorMessage = await errorLebel.textContent();
console.log(errorMessage)
expect(errorMessage).toContain("This field is required.")

})

test('Radio Button', async ({page}) => {
await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
await page.locator('#headingOne .accordion-button.collapsed').click()
await page.getByText(' Radio Button').click()
await expect(page).toHaveTitle("Selenium Practice - Radio Button")
await expect(page.locator('form h1')).toHaveText("Radio Button")
await expect(page.locator("input[value='igottwo']")).not.toBeChecked()
await expect(page.locator("input[value='igotthree']")).not.toBeChecked()
//option3
await expect(page.locator("input[value='option3']")).toBeDisabled()

await page.locator("input[value='igottwo']").click()
await expect(page.locator("input[value='igottwo']")).toBeChecked()
await expect(page.locator("#check")).toHaveText('You have checked Yes')
console.log("Print checked Box message")
const printMessage = await page.locator("#check")
const Message = await printMessage.textContent()
console.log(Message)

//now click on  imprassive radio button
await page.locator("//input[@value='igotthree']").click()
await expect(page.locator("input[value='igotthree']")).toBeChecked()
await expect(page.locator("#check1")).toHaveText('You have checked Impressive')

console.log("Print checked Impressive Box message")
const impMassage = await page.locator("#check1")
const impM1 = await impMassage.textContent()
console.log(impM1)
//printing half of the message   -- method 1
const halfMessage = impM1.substring(0, impM1.length / 2); 
console.log(halfMessage);
//printing half of the message   -- method 2
console.log("print half message")
const printHalfMessage1 = impM1.slice(0,2)
console.log(printHalfMessage1)

await expect(page.locator("#check")).not.toBeVisible()



})