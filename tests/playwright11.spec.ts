import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion utilities.

test('Validate Amazon search returns results for a keyword', async ({ page }) => { // Define a test case and receive a browser page fixture.
	const searchKeyword = 'laptop'; // Set the search term to validate.

	await page.goto('https://amazon.com', { waitUntil: 'domcontentloaded' }); // Navigate to Amazon and wait for initial DOM load.
	await page.waitForTimeout(2000)
	const continueButton = page.getByRole('button', { name: /^continue( shopping)?$/i }).first(); // Locate optional interstitial Continue button shown in some regions.
	const continueVisible = await continueButton.isVisible({ timeout: 5000 }).catch(() => false); // Check whether the Continue button appears without throwing if absent.

	if (continueVisible) { // Enter this branch only when the interstitial is displayed.
		await Promise.all([ // Run click and load wait together to handle either full navigation or dynamic page swap.
			page.waitForLoadState('domcontentloaded').catch(() => undefined), // Wait for the next DOM content load event if navigation happens.
			continueButton.click() // Click Continue to proceed to the Amazon homepage.
		]); // Complete both actions before moving forward.
		await page.waitForLoadState('networkidle').catch(() => undefined); // Give the page extra time to settle after transition.
	} // End optional interstitial handling.

	const searchBox = page.locator('#twotabsearchtextbox'); // Locate the main Amazon search input field.
	await expect(searchBox).toBeVisible({ timeout: 15000 }); // Ensure the search box is visible before typing.

	await searchBox.fill(searchKeyword); // Enter the search keyword into the search box.
	await searchBox.press('Enter'); // Submit the search by pressing Enter.

	await expect(page).toHaveURL(/(k=|field-keywords=)laptop/i, { timeout: 20000 }); // Verify the URL contains the submitted keyword parameter.

	const results = page.locator('[data-component-type="s-search-result"]'); // Locate the product result cards shown on the search results page.
	await expect(results.first()).toBeVisible({ timeout: 20000 }); // Confirm at least one search result is displayed.
	const resultCount = await results.count(); // Read the total number of result cards currently rendered.
	expect(resultCount).toBeGreaterThan(0); // Validate that the total result count is greater than zero.
}); // End the test case.
