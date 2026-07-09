//Data Driven Testing

// Install: npm i -D csv-parse    

import { test, expect } from '@playwright/test';
import HomepagePOM from '../pages/BlazeDemoHomepagePOM';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Read CSV file
const records = parse(
  fs.readFileSync(path.join(__dirname, '../data/cities.csv')),
  {
    columns: true,
    skip_empty_lines: true
  }
);

// Generate one Playwright test for each CSV row
for (const data of records) {

  //@ts-ignore
  test(`TestCase17 - ${data.fromCity} to ${data.toCity}`, async ({ page }) => {
    //@ts-ignore
    let fromCity: string = data.fromCity;
    //@ts-ignore
    let toCity: string = data.toCity;

    await page.goto('https://blazedemo.com/');
    const homepage = new HomepagePOM(page);
    await homepage.getFromCityListbox.selectOption(fromCity);
    await homepage.getToCityListbox.selectOption(toCity);
    await homepage.getFindFlightsButton.click();
    await page.waitForTimeout(2000);
    await expect(page.locator("body")).toContainText(`Flights from ${fromCity} to ${toCity}:`);
  });
}