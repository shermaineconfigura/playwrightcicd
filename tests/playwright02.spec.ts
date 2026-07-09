import {test, expect } from '@playwright/test';

test('TestCase2', async ({ page }) => {
    await page.goto('https://google.com/');
    let textbox = await page.locator("css=#APjFqb");
    await textbox.highlight();
    await expect(textbox).toBeEnabled();
    await expect(textbox).toBeVisible();
    await expect(textbox).toHaveCount(1);
    await page.waitForTimeout(3000);
})