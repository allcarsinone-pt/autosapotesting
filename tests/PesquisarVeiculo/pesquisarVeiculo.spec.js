const { describe, it, expect, test } = require("@playwright/test")

describe("Simple Search", () => {
    test("should return a list of cars with brand BMW", async ({page})=> {
        await page.goto("https://auto.sapo.pt/")
        const searchTextBox = await page.locator("#search-used")
        await searchTextBox.focus()
        await searchTextBox.fill("BMW")
        const searchUsedButtom = await page.locator("#search-used-button")
        await searchUsedButtom.click()
        const resultsXPath = await page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
        const text = await resultsXPath.textContent()
        const sanitizedText = text.replace("<strong>", "").replace("</strong>","")
        expect(sanitizedText).toMatch(new RegExp("[1-9]+[ ]carros[ ]usados"))


    })
})