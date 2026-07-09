import { test, expect } from '@playwright/test';

const testData = {
	url: 'https://www.blazedemo.com',
	waitUntil: 'domcontentloaded',
	timeouts: {
		postPurchaseMs: 2000
	},
	selectors: {
		departureCity: 'select[name="fromPort"]',
		destinationCity: 'select[name="toPort"]',
		departureOptions: 'select[name="fromPort"] option',
		destinationOptions: 'select[name="toPort"] option',
		firstFlightRow: 'table tbody tr',
		inputName: '#inputName',
		address: '#address',
		city: '#city',
		state: '#state',
		zipCode: '#zipCode',
		cardType: '#cardType',
		creditCardNumber: '#creditCardNumber',
		creditCardMonth: '#creditCardMonth',
		creditCardYear: '#creditCardYear',
		nameOnCard: '#nameOnCard',
		statusCell: 'td'
	},
	flightSearch: {
		departure: 'Boston',
		destination: 'London',
		findFlightsButton: 'Find Flights',
		chooseFlightButton: 'Choose This Flight',
		expectedOptionCount: 7,
		expectedRouteHeading: 'Flights from Boston to London'
	},
	form: {
		name: 'John Doe',
		address: '123 Main Street',
		city: 'Boston',
		state: 'Massachusetts',
		zipCode: '02110',
		cardType: 'Visa',
		creditCardNumber: '4111111111111111',
		creditCardMonth: '12',
		creditCardYear: '2028',
		nameOnCard: 'John Doe',
		purchaseFlightButton: 'Purchase Flight'
	},
	validation: {
		reservePath: 'reserve.php',
		purchasePath: 'purchase.php',
		confirmationPath: 'confirmation.php',
		reservedHeadingPattern: 'Your flight from .* to .* has been reserved\\.',
		confirmationHeading: 'Thank you for your purchase today!',
		statusText: 'PendingCapture'
	}
} as const;

test('Search flights from Boston to London', async ({ page }) => {
	await page.goto(testData.url, {
		waitUntil: testData.waitUntil
	});

	const departureCity = page.locator(testData.selectors.departureCity);
	const destinationCity = page.locator(testData.selectors.destinationCity);
	const departureOptions = page.locator(testData.selectors.departureOptions);
	const destinationOptions = page.locator(testData.selectors.destinationOptions);

	await expect(departureCity).toBeVisible();
	await expect(destinationCity).toBeVisible();
	await expect(departureOptions).toHaveCount(testData.flightSearch.expectedOptionCount);
	await expect(destinationOptions).toHaveCount(testData.flightSearch.expectedOptionCount);

	await departureCity.selectOption({ label: testData.flightSearch.departure });
	await destinationCity.selectOption({ label: testData.flightSearch.destination });

	await page.getByRole('button', { name: testData.flightSearch.findFlightsButton }).click();

	await expect(page).toHaveURL(new RegExp(testData.validation.reservePath, 'i'));
	await expect(page.getByRole('heading', { name: new RegExp(testData.flightSearch.expectedRouteHeading, 'i') })).toBeVisible();

	await page
		.locator(testData.selectors.firstFlightRow)
		.first()
		.getByRole('button', { name: testData.flightSearch.chooseFlightButton })
		.click();

	await expect(page).toHaveURL(new RegExp(testData.validation.purchasePath, 'i'));
	await expect(
		page.getByRole('heading', { name: new RegExp(testData.validation.reservedHeadingPattern, 'i') })
	).toBeVisible();

	await page.locator(testData.selectors.inputName).fill(testData.form.name);
	await page.locator(testData.selectors.address).fill(testData.form.address);
	await page.locator(testData.selectors.city).fill(testData.form.city);
	await page.locator(testData.selectors.state).fill(testData.form.state);
	await page.locator(testData.selectors.zipCode).fill(testData.form.zipCode);
	await page.locator(testData.selectors.cardType).selectOption({ label: testData.form.cardType });
	await page.locator(testData.selectors.creditCardNumber).fill(testData.form.creditCardNumber);
	await page.locator(testData.selectors.creditCardMonth).fill(testData.form.creditCardMonth);
	await page.locator(testData.selectors.creditCardYear).fill(testData.form.creditCardYear);
	await page.locator(testData.selectors.nameOnCard).fill(testData.form.nameOnCard);

	await page.getByRole('button', { name: testData.form.purchaseFlightButton }).click();

	await expect(page).toHaveURL(new RegExp(testData.validation.confirmationPath, 'i'));
	await expect(page.getByRole('heading', { name: testData.validation.confirmationHeading })).toBeVisible();
	await page.waitForTimeout(testData.timeouts.postPurchaseMs);
	await expect(page.locator(testData.selectors.statusCell, { hasText: testData.validation.statusText })).toBeVisible();
});
