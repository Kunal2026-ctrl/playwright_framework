import { test, expect } from '@playwright/test';



test('Standard Dropdown Testing', async ({ page }) => {
    await page.goto('https://www.amazon.in/')
    //await page.waitForLoadState('networkidle')
    //selecting value using value
    await page.locator('#searchDropdownBox').selectOption('search-alias=alexa-skills')
    console.log("Checks done for Value")
    //selecting value using label - visible text
    await page.locator('#searchDropdownBox').selectOption({ label: 'Alexa Skills' })
    console.log("Checks done for Lebel")
    //selecting value using index
    await page.locator('#searchDropdownBox').selectOption({ index: 2 })
    // using selector options
    await page.selectOption("#searchDropdownBox", { label: 'Alexa Skills' })
    console.log('Selector option validated')


    //now validate expected value selected or not by inputValue method
    const selectedValue = await page.locator('#searchDropdownBox').inputValue();
    expect(selectedValue).toBe('search-alias=alexa-skills');
    console.log("Validation passed for Value to be selected")

    // now validating by using texyContent method
    const selectedValuetextContant = await page.locator('#searchDropdownBox option:checked').textContent();
    expect(selectedValuetextContant).toBe('Alexa Skills');
    console.log("Validation passed for textContant method")

    // const selectedValuetextContant1 = await page.locator('#searchDropdownBox option:checked').textContent();
    // expect(selectedValuetextContant1).toBe('All Categories');

    const totalCount = await page.locator('#searchDropdownBox').count();
    console.log(totalCount);

    console.log("Standard Dropdown Testing  V1 Passed")

    
})


test('Validation for by default drop down option', async ({ page }) => {
    await page.goto('https://www.amazon.in/')
    const selectedValuetextContant1 = await page.locator('#searchDropdownBox option:checked').textContent();
    expect(selectedValuetextContant1).toBe('All Categories');
    console.log(selectedValuetextContant1)

})


test('Validation for counting totla coming in dropdown option', async ({ page }) => {
    await page.goto('https://www.amazon.in/')
    const selectedValuetextContant1 = await page.locator('#searchDropdownBox option:checked').textContent();
    expect(selectedValuetextContant1).toBe('All Categories');
    const totalCount = await page.locator('#searchDropdownBox option').count();
    console.log(totalCount);
    expect(totalCount).toBe(46)
    expect(totalCount).toBeGreaterThan(20)
    console.log("Validation passed for counting total coming in dropdown option")
})



test('Custom dropdown Validations', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    //await page.getByText('Login').click()
    await page.locator('.oxd-button').click()
    console.log("Successfully logged in")
    await expect(page.locator('.oxd-text.oxd-text--h6')).toBeVisible()
    console.log("Assertions passed")
    await page.waitForTimeout(5000)
    await page.locator('.oxd-userdropdown-tab').click()
    await page.locator("[role='menuitem']", { hasText: 'Support' }).click()
    console.log("Support tab clicked")
    const pageTitle = await page.locator(".orangehrm-sub-title").textContent()
    console.log(pageTitle)
    await expect(page.locator(".orangehrm-sub-title")).toHaveText("Customer Support")

    await page.locator(".oxd-main-menu-item--name", { hasText: 'Leave' }).click()
    console.log("Leave tab clicked")
    await expect(page.locator(".oxd-topbar-header-breadcrumb-module")).toHaveText("Leave")
    console.log("Page have leave text present")
    await page.waitForSelector(".oxd-multiselect-wrapper .oxd-select-text")
    await page.locator(".oxd-multiselect-wrapper .oxd-select-text").click()

    await page.locator(".oxd-select-option", { hasText: 'Cancelled' }).click()
    console.log("Cancelled leave type selected")
    await page.waitForSelector(".oxd-multiselect-chips-selected")
    await expect(page.locator(".oxd-multiselect-chips-area .oxd-chip.oxd-chip--default.oxd-multiselect-chips-selected", { hasText: 'Cancelled' })).toBeVisible()
    //await expect(page.locator(".oxd-chip"))

    console.log("End")




})


test('Auto Suggestion Searchable Dropdown Validations', async ({ page }) => {
    await page.goto('https://www.amazon.in/')
    await page.locator('#twotabsearchtextbox').fill('books')
    await page.waitForSelector('.left-pane-results-container')
    await expect(page.locator('.left-pane-results-container')).toBeVisible()
    //await page.waitForTimeout(5000)
    console.log("Searched texts are visible below")
    const totalValueInDropdown = await page.locator("[id*='sac-suggestion-row']").count()
    console.log(totalValueInDropdown)
    await expect(totalValueInDropdown).toBe(20)
    console.log("Total DropDown is counted")

    //print all the test content in the dropdown
    const dropdownText = await page.locator("[id*='sac-suggestion-row']").allTextContents()
    console.log(dropdownText)
    console.log("All dropdownText shown printed")


    await expect(page.locator("[id*='sac-suggestion-row']", { hasText: 'bookshelf for home' }).first()).toBeVisible()
    console.log("validating the visible text")

    //page.locator("[id*='sac-suggestion-row']", { hasText: 'bookshelf for home' }).first().click()

    //now using For loop for the same 
    const bookOptions = await page.locator("[id*='sac-suggestion-row']").all();
    //now enhanced for loop
    for (const option of bookOptions) {
        const text = await option.textContent();
        if (text && text.includes('bookshelf for home')) {
            await option.click()
            console.log("Book selected from Auto Suggestion")
        }
        break;
    }
    console.log("Coming out of loop")
    await page.waitForTimeout(5000)



    console.log("Ending..................................")


    await page.close()

})

