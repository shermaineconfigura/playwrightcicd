import {test, expect } from '@playwright/test';

test('Handle JavaScript alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    await page.waitForTimeout(2000)

    await page.on('dialog', async dialog => {
        switch(dialog.type()) {
            case 'alert':
                console.log('Alert message:', dialog.message());
                await expect(dialog.message()).toBe('I am a JS Alert');
                await dialog.accept();
                break;
            case 'confirm':
                console.log('Confirm message:', dialog.message());
                await expect(dialog.message()).toBe('I am a JS Confirm');
                await dialog.dismiss();
                break;  
            case 'prompt':
                console.log('Prompt message:', dialog.message());
                await expect(dialog.message()).toBe('I am a JS prompt');
                await dialog.accept('Playwright');
                await expect(page.locator('#result')).toHaveText('You entered: Playwright');
                break; 
        } 
    })

    await page.locator('button[onclick="jsAlert()"]').click()
    await page.waitForTimeout(2000)
    await page.locator('button[onclick="jsConfirm()"]').click()
    await page.waitForTimeout(2000)
    await page.locator('button[onclick="jsPrompt()"]').click()
    await page.waitForTimeout(2000)
})