import {test, expect} from '@playwright/test'

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

test('locating child elements', async({page}) => {
    //compact finding child element 
    await page.locator('nb-card nb-radio :text-is("Option 1")').click
    //alternative find child element
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click
    //mix different types
    await page.locator('nb-card').getByRole('button').click()
})

test('Locate parent element', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: 'Basic Form'}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('Reusing Locators', async({page}) =>
{
    const baseForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = baseForm.getByRole('textbox', {name:"Email"})

    await emailField.fill('Test@tester.com')
    await baseForm.getByRole('textbox', {name:"Password"}).fill('Password123')
    await baseForm.locator('nb-checkbox').click()
    await baseForm.getByRole('button').click()

    await expect(emailField).toHaveValue('Test@tester.com')
})

test('extracting values', async({page}) =>{
    //This grabs a single value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //This checks through a group and finds one
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    //Check against inputted values
    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    await emailField.fill('Test@Tester.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('Test@Tester.com')

    //Grabs placeholders inside text boxes
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) =>{
    //general assertions
    const baseFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const value = 5
    expect(value).toEqual(5)

    const text = await baseFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator assertions
    await expect(baseFormButton).toHaveText('Submit')

    //Soft Assertions
    await expect.soft(baseFormButton).toHaveText('Sub')
    await baseFormButton.click()

})