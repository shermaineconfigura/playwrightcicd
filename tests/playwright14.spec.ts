import { test, expect } from '@playwright/test'; 
import homepagePOM  from '../pages/BlazeDemoHomepagePOM';
import resultpagePOM from '../pages/BlazeDemoResultpagePOM';
import purchasePagePOM from '../pages/BlazeDemoPurchasepagePOM';
import confirmationPagePOM from '../pages/BlazeDemoConfirmpagePOM';

test('Test case 14', async ({ page }) => {
    await page.goto('https://blazedemo.com/');
    const homepage = new homepagePOM(page);
    //await page.pause();
    await expect(homepage.FindFlightsButton).toBeVisible();
    
    await homepage.FromCityListbox.selectOption('Boston');
    await homepage.ToCityListbox.selectOption('London');
    await homepage.FindFlightsButton.click();

    const resultpage = new resultpagePOM(page);
    await resultpage.getFlightButton(1).click();
    await page.waitForTimeout(2000);

    const purchasePage = new purchasePagePOM(page);
    await purchasePage.NameTextbox.fill('John Doe');
    await purchasePage.AddressTextbox.fill('123 Main St');
    await purchasePage.CityTextbox.fill('New York');
    await purchasePage.StateTextbox.fill('NY');
    await purchasePage.ZipCodeTextbox.fill('10001');
    await purchasePage.CardTypeListbox.selectOption('Visa');
    await purchasePage.CreditCardNumberTextbox.fill('4111111111111111');
    await purchasePage.CreditCardMonthTextbox.fill('12');
    await purchasePage.CreditCardYearTextbox.fill('2025');
    await purchasePage.NameOnCardTextbox.fill('John Doe');
    await purchasePage.RememberMeCheckbox.check();
    await purchasePage.PurchaseFlightButton.click();

    await page.waitForTimeout(2000);

    const confirmationPage = new confirmationPagePOM(page);
    await expect(confirmationPage.ConfirmationHeading).toBeVisible();
    await expect(confirmationPage.ConfirmationId).toHaveText(/^\d+$/);
    await expect(confirmationPage.ConfirmationStatus).toHaveText('PendingCapture');
    await expect(confirmationPage.ConfirmationAmount).toHaveText(/\d+\susd/i);
    await expect(confirmationPage.ConfirmationCardNumber).toHaveText(/x{12}1111/);
    await expect(confirmationPage.ConfirmationExpiration).toHaveText(/\d{2}\s+\/\d{4}/);
    await expect(confirmationPage.ConfirmationAuthCode).toHaveText(/^\d+$/);
    await expect(confirmationPage.ConfirmationDate).toHaveText(/^[A-Za-z]{3},\s(0[1-9]|[12][0-9]|3[01])\s[A-Za-z]{3}\s\d{4}\s([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\s[+-]\d{4}$/);


    await page.waitForTimeout(2000);
});