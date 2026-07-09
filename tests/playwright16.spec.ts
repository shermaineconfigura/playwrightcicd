//-------- Objective--------
// 1. Validating embeded rest api (ajax api validation)

import { test, expect } from "@playwright/test"


test("TestCase16", async ({ page }) => {
    test.setTimeout(60000);

    await page.goto("https://amazon.com")
    await page.waitForTimeout(5000)

    await page.locator("id=searchDropdownBox").selectOption({ label: 'Electronics' })
    
    await page.route(/prefix=Laptop/, async (route) => {
        await page.waitForTimeout(1000)
        await route.continue()
        //if (route.request().response() != null) 
        {
         await route.request().response().then(res => {
                expect(res?.status()).toBe(200)
                res?.json().then(async (json) => {
                    let allValues = json.suggestions
                    for(let i=0; i<allValues.length; i++){
                        let apiValue = allValues[i].value
                        let uiItem = await page.locator("[role='row']").nth(i)
                        await uiItem.highlight()
                        let uiValue = await uiItem.innerText()
                        console.log("%d/%d=%s,%s",i+1,allValues.length, apiValue, uiValue)
                        expect(uiValue).toBe(apiValue)
                    }
                })
            })
        }
    })


    await page.locator("#twotabsearchtextbox").pressSequentially("Laptop")
    await page.waitForTimeout(2000)


})