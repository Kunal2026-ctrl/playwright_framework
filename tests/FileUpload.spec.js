import { test, expect } from '@playwright/test';
import path from 'path';

test.skip('File Upload', async ({ page }) => {
await page.goto('https://testpages.eviltester.com/pages/files/file-upload/')
const filePath = path.join(__dirname,'Uploads','PlayW.txt')
await page.setInputFiles('#fileinput',filePath)
await page.waitForTimeout(5000)


})

test('Multiple File Upload', async ({ page }) => {
await page.goto('http://uitestingplayground.com/upload')
const filePath = path.join(__dirname,'Uploads','PlayW.txt')
const filePath1 = path.join(__dirname,'Uploads','one.txt')
const frame = await page.frameLocator("iframe[src='/static/upload.html']")
await frame.locator('#browse').waitFor({state : 'attached'})
await frame.locator('#browse').setInputFiles([filePath, filePath1])
await page.waitForTimeout(5000)
})