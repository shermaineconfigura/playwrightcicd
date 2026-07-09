import {test, expect } from '@playwright/test';

test('Handle JavaScript alerts', async ({ page }) => {
    await page.goto('https://blazedemo.com/')
    await page.locator("select[name='fromPort']").selectOption({label: 'New York'})
    await page.locator("select[name='toPort']").selectOption({label: 'London'})
    await page.locator("input[type='submit']").click()
    await expect(page.locator("table.table tbody tr")).toHaveCount(5);
})