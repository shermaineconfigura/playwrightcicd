export default class ConfirmationPagePOM {
	page: any;

	constructor(page: any) {
		this.page = page;
	}

	get ConfirmationHeading() {
		return this.page.getByRole('heading', { name: 'Thank you for your purchase today!' });
	}

	get ConfirmationId() {
		return this.page.locator('//td[normalize-space()="Id"]/following-sibling::td');
	}

	get ConfirmationStatus() {
		return this.page.locator('//td[normalize-space()="Status"]/following-sibling::td');
	}

	get ConfirmationAmount() {
		return this.page.locator('//td[normalize-space()="Amount"]/following-sibling::td');
	}

	get ConfirmationCardNumber() {
		return this.page.locator('//td[normalize-space()="Card Number"]/following-sibling::td');
	}

	get ConfirmationExpiration() {
		return this.page.locator('//td[normalize-space()="Expiration"]/following-sibling::td');
	}

	get ConfirmationAuthCode() {
		return this.page.locator('//td[normalize-space()="Auth Code"]/following-sibling::td');
	}

	get ConfirmationDate() {
		return this.page.locator('//td[normalize-space()="Date"]/following-sibling::td');
	}

	get BackToHomeLink() {
		return this.page.getByRole('link', { name: 'Back to home' });
	}
}
