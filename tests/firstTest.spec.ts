import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
   await page.goto('http://localhost:4200/')
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //await page.locator('input').first().click()

    //By tag
    page.locator('input')
    // by ID
 //
 //    await page.locator('#inputEmail1').click()
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

test('User facing Locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test.only('locating child elements', async({page}) => {
    //compact finding child element 
    await page.locator('nb-card nb-radio :text-is("Option 1")').click
    //alternative find child element
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click
    //mix different types
    await page.locator('nb-card').getByRole('button').click()
})