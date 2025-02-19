import {test} from '@playwright/test'

//test.beforeEach(async({page}) => {
 //   await page.goto('http://localhost:4200/')
 //   await page.getByText('Forms').click()
 //   await page.getByText('Form Layouts').click()
//})

test('Locator syntax rules', async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('input').first().click()

    //By tag
    page.locator('input')
    // by ID
    page.locator('#inputEmail1')
    // by class value
    page.locator('.shape-rectangle')
    //by attribute
    page.locator('[placeholder="Email"]')
    //by class value
    page.locator('[input-full-width size-medium status-basic shape-rectangle nb-transition]')
    //combination
    page.locator('input[placeholder="Email"]')
    //xPath but don't do it
    page.locator('//*[@id="inputEmail1"]')
    //Partial text match
    page.locator(':text("Using")')
    //Exact
    page.locator(':text-is("Using the grid")')

})

