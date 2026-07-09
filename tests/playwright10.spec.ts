import { test, expect } from '@playwright/test';

test('TestCase10', async ({ page }) => {
  // Navigate to Amazon
  await page.goto('https://www.amazon.com', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitForTimeout(2000);
  // Handle the "Continue" page if it appears
  //const continueButton = page.getByRole('button', { name: "Continue shopping"});
  const continueButton = await page.locator('button[alt="Continue shopping"]')

  if (await continueButton.isVisible()) {
    await continueButton.click();
    await page.waitForTimeout(2000)
  }

  // Wait for the search category dropdown to appear
  const categoryDropdown = page.locator('#searchDropdownBox');
  await expect(categoryDropdown).toBeVisible();

  // Validate default selection
  await expect(categoryDropdown).toHaveValue('search-alias=aps');

  const defaultOption = await categoryDropdown
    .locator('option:checked')
    .textContent();

  expect(defaultOption?.trim()).toBe('All Departments');

  // Select Electronics
  await categoryDropdown.selectOption({ label: 'Electronics' });

  // Validate Electronics is selected
  const selectedOption = await categoryDropdown
    .locator('option:checked')
    .textContent();

  expect(selectedOption?.trim()).toBe('Electronics');
});