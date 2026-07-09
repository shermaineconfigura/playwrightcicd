export default class PurchasePagePOM {
	page: any;

	constructor(page: any) {
		this.page = page;
	}

	get NameTextbox() {
		return this.page.locator('input[name="inputName"]');
	}

	get AddressTextbox() {
		return this.page.locator('input[name="address"]');
	}

	get CityTextbox() {
		return this.page.locator('input[name="city"]');
	}

	get StateTextbox() {
		return this.page.locator('input[name="state"]');
	}

	get ZipCodeTextbox() {
		return this.page.locator('input[name="zipCode"]');
	}

	get CardTypeListbox() {
		return this.page.locator('select[name="cardType"]');
	}

	get CreditCardNumberTextbox() {
		return this.page.locator('input[name="creditCardNumber"]');
	}

	get CreditCardMonthTextbox() {
		return this.page.locator('input[name="creditCardMonth"]');
	}

	get CreditCardYearTextbox() {
		return this.page.locator('input[name="creditCardYear"]');
	}

	get NameOnCardTextbox() {
		return this.page.locator('input[name="nameOnCard"]');
	}

	get RememberMeCheckbox() {
		return this.page.locator('input[name="rememberMe"]');
	}

	get PurchaseFlightButton() {
		return this.page.getByRole('button', { name: 'Purchase Flight' });
	}
}
