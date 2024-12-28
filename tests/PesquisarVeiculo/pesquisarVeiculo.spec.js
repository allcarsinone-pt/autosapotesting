const { describe, it, expect, test} = require("@playwright/test")
const config = require("../../test-config.json").pesquisarVeiculo


async function searchSimple(url, page, filter, xpath) {
        await page.goto(url)
        const searchTextBox = await page.locator("#search-used")
        await searchTextBox.focus()
        await searchTextBox.fill(filter)
        const searchUsedButtom = page.locator("#search-used-button")
        await searchUsedButtom.click()
        const resultsXPath = await page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
        const text = await resultsXPath.textContent()
        const sanitizedText = parseInt(text.replace("<strong>", "").replace("</strong>","").split()[0])
        const carXPath = xpath
        const resultsCarXPath = (await page.locator(carXPath).allTextContents())

        return { count: sanitizedText, results: resultsCarXPath}
}



describe("Simple Search", () => {
    test.beforeAll(async ( {browser}) => {
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto(config.global)
    
        const cookieScreen = await page.locator('//*[@id="qc-cmp2-ui"]')
        const visible = await cookieScreen.isVisible()
        if(visible) {
            const acceptCookies = await page.locator('//*[@id="qc-cmp2-ui"]/div[2]/div/button[3]')
            await acceptCookies.click()
        }
        
    
    })
    test("should return a list of cars with some brand", async ({context}) => {
        const page = await context.newPage()
        
        const result = await searchSimple(config.global,page, config.tests[0].filter, '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a')
        expect(result.count).toBeGreaterThan(0)
        const found = result.results.every((value) => value.includes(config.tests[0].filter))
        expect(found).toBe(true)


    })
    test("should return a list of cars with some model", async ({context}) => {
        const page = await context.newPage()
        const result = await searchSimple(config.global,page, config.tests[1].filter, '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a')
        expect(result.count).toBeGreaterThan(0)
        const found = result.results.every((value) => value.includes(config.tests[1].filter))
        expect(found).toBe(true)


    })
})