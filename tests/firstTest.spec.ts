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
})