import{test, expect} from '@playwright/test';

test.skip('Handling Web Table', async({page})=>
{

await page.goto('https://letcode.in/table')
await expect(page.locator('#shopping')).toBeVisible()
const numberOfRows = await page.locator('#shopping tbody tr').count()
console.log(numberOfRows)
expect(numberOfRows).toBe(4)
console.log("Total rows in the table are 4")

const column = await page.locator('#shopping thead tr th').count()
console.log(`Total number of columns are : ${column}`);
console.log(column)
expect(column).toBe(2)

const itemName = await page.locator('#shopping tbody tr:nth-child(2) td:nth-child(1)').textContent()
console.log(`itemName is : ${itemName}`)
expect(itemName).toBe('Apple')


const itemPrice = await page.locator('#shopping tbody tr:nth-child(2) td:nth-child(2)').textContent()
console.log(`itemPrice is : ${itemPrice}`)
expect(itemPrice).toBe('180')

//validate the column names
const columnNames = ['Items','Price']
const columnTextName = await page.locator('#shopping thead tr th').allTextContents()
console.log(`itemPrice is : ${columnTextName}`)
expect(columnTextName).toEqual(columnNames)

})

test('Handling Web Table -1', async({page})=>
{

await page.goto('https://letcode.in/table')
await expect(page.locator('#simpletable')).toBeVisible()
/*const name = 'Koushik'
const row =await page.locator('#simpletable tbody tr').filter({hasText : name})
row.locator('#first').check()
await expect(row.locator('#first')).toBeChecked()
await page.waitForTimeout(5000)*/

//ny using enhanced for loop
const names = ['Koushik','Yashwanth','Iron']
for(const name of names)
{
    const row =page.locator('#simpletable tbody tr').filter({hasText : name});
    await row.locator("input[type='checkbox']").check();
    await expect(row.locator("input[type='checkbox']")).toBeChecked();
}
await page.waitForTimeout(9000)
console.log("Validation using enhanced for loop is done")

})

