import{test, expect} from '@playwright/test';
import { escape } from 'querystring';

test.skip('Mouse Action  - One', async ({page})=>
{

    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await expect(page.locator('#click_type')).not.toBeVisible();
    console.log("Text not visible");
    await page.locator('#click_area').click();
    await page.click('#click_area');
    await expect(page.locator('#click_type')).toHaveText("Click")
     console.log("Text visible");

    await page.waitForTimeout(5000)


})
test.skip('Mouse Action  - Right Click', async ({page})=>
{

    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await expect(page.locator('#click_type')).not.toBeVisible();
    console.log("Text not visible");
    await page.locator('#click_area').click({button : 'right'});
    //another way of right click
    await page.click('#click_area',{button : 'right'});
    await expect(page.locator('#click_type')).toHaveText("Right-Click")
    console.log("Text visible");

    await page.waitForTimeout(5000)


})

test.skip('Mouse Action  - Double Click', async ({page})=>
{

    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await expect(page.locator('#click_type')).not.toBeVisible();
    console.log("Text not visible");
    await page.locator('#click_area').dblclick();
    //another way of right click
    await page.dblclick('#click_area');
    await expect(page.locator('#click_type')).toHaveText("Double-Click")
    console.log("Text visible");

    await page.waitForTimeout(5000)


})

test.skip('Mouse Action  - Mouse Hover', async ({page})=>
{

    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.locator('.dropbtn').hover();
    // Another way of hovering the mouse
    await page.hover('.dropbtn');
    await page.locator("text='Java'").click();/// select/click based on the text
    await expect(page.locator("#hover_validate")).toHaveText("Java");

    await page.waitForTimeout(5000)
})

//#drag_source
//Drag anf Drop 

test.skip('Mouse Action  - Drag & Drop', async ({page})=>
{

    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.dragAndDrop("#drag_source", "#drop_target")
    await expect(page.locator("div h3")).toHaveText("Drop is successful!")
    console.log("Dragged successfully")

    //another method
    await page.locator('#drag_source').dragTo(page.locator('#drop_target'));
     await expect(page.locator("div h3")).toHaveText("Drop is successful!")
    console.log("Another Dragged successfully")
  

    await page.waitForTimeout(5000)
})

test('Mouse Action  - Mouse scroll', async ({page})=>
{

    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.mouse.wheel(0,500)
    //Although playwright automatically scrolls ups and downs
    console.log("Mouse scrolling done/passed")
  

    await page.waitForTimeout(5000)
})

