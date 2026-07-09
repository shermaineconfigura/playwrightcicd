import {test, expect } from '@playwright/test';

test('Interact inside a frame', async ({ page }) => {
    await page.goto('https://jqueryui.com/spinner/')
    await page.waitForTimeout(2000)

    const frame = page.frameLocator(".demo-frame")
    await frame.locator(".ui-spinner-up").click()
    await page.waitForTimeout(2000)
    await expect(frame.locator("#spinner")).toHaveAttribute("aria-valuenow", "1")
})