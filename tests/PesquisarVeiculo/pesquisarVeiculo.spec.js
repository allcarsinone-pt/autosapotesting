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
        console.log(sanitizedText)
        if(sanitizedText === 0){
            return { count:sanitizedText, results: []}
        }
        const carXPath = xpath
        const resultsCarXPath = (await page.locator(carXPath).allTextContents())

        return { count: sanitizedText, results: resultsCarXPath}
}

export default function searchTests() {
    describe("Simple Search", () => {

        test.use({ storageState: 'cookies.json' });
    
        test("should return a list of cars with some brand", async ({context}) => {
            
            const page = await context.newPage()
            const result = await searchSimple(config.global,page, config.tests[0].filter, '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a')
            expect(result.count).toBeGreaterThan(0)
            const found = result.results.every((value) => value.includes(config.tests[0].filter))
            expect(found).toBe(true)
            await page.close()
        })
        test("should return a list of cars with some model", async ({context}) => {
            
            const page = await context.newPage()
            const result = await searchSimple(config.global,page, config.tests[1].filter, '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a')
            expect(result.count).toBeGreaterThan(0)
            const found = result.results.every((value) => value.includes(config.tests[1].filter))
            expect(found).toBe(true)
            await page.close()
        })

        test("should not return a list of car if car doesn't exist", async ({context}) => {
            
            const page = await context.newPage()
            const result = await searchSimple(config.global,page, config.tests[2].filter, '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a')
            expect(result.count).toBe(0)
            console.log(result)
            const found = result.results.length !== 0
            expect(found).toBe(false)
            await page.close()
        })

        test("should return a list of car with some name with fuel type filter", async ({context}) => {
            
            const page = await context.newPage()
            let result
            await page.goto(config.global)
            
            const linkToPesquisaAvancada = page.locator('//*[@id="home"]/section[1]/div/div/div/div[3]/div/div[2]/a')
            await linkToPesquisaAvancada.click()
            const buttonDropdownCombustivel = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[5]/div/div/button')
            await buttonDropdownCombustivel.click()
            const fuelOption = page.locator(config.tests[3].fuel)
            await fuelOption.click()
            await fuelOption.press("Escape")
            const nameTextBox = page.locator('//*[@id="searchTerm"]')
            await nameTextBox.focus()
            await nameTextBox.fill(config.tests[3].filter)
            const searchUsedButtom = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[12]/a[4]')
            await searchUsedButtom.click()
            
            const resultsXPath = await page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
            const text = await resultsXPath.textContent()
            const sanitizedText = parseInt(text.replace("<strong>", "").replace("</strong>","").split()[0])
            console.log(sanitizedText)
            await page.waitForTimeout(2000)
            if(sanitizedText === 0){
                result = { count:sanitizedText, results: []}
            }
            else {
            const carXPath = '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a'
            const resultsCarXPath = (await page.locator(carXPath).allTextContents())

            result = { count: sanitizedText, results: resultsCarXPath}

               
            }
            expect(result.count).toBeGreaterThan(0)
            const found = result.results.every((value) => value.includes(config.tests[3].filter))
            expect(found).toBe(true)
            await page.close()
        })
        
        //Aplicação de técnicas de valor fronteira e equivalência
        test("should return a list of car with some name and with a price filter", async ({context}) => {
            
            const page = await context.newPage()
            let result
            await page.goto(config.global)
            
            const linkToPesquisaAvancada = page.locator('//*[@id="home"]/section[1]/div/div/div/div[3]/div/div[2]/a')
            await linkToPesquisaAvancada.click()

            const filtroDePrecoDe =  page.locator('//*[@id="priceStart"]')
            const filtroDePrecoAte = page.locator('//*[@id="priceEnd"]')

            await filtroDePrecoDe.focus()
            await page.waitForTimeout(2000)
            await filtroDePrecoDe.fill(config.tests[4].de)

            await filtroDePrecoAte.focus()
            await page.waitForTimeout(2000)
            await filtroDePrecoAte.fill(config.tests[4].ate)
            await filtroDePrecoAte.press("Tab")
            const nameTextBox = page.locator('//*[@id="searchTerm"]')
            await nameTextBox.focus()
            await nameTextBox.fill(config.tests[4].filter)
            const searchUsedButtom = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[12]/a[4]')
            await searchUsedButtom.click()
            
            const resultsXPath = await page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
            await page.waitForTimeout(2000)
            const text = await resultsXPath.textContent()
            const sanitizedText = parseInt(text.replace("<strong>", "").replace("</strong>","").split()[0])
            console.log(sanitizedText)
            if(sanitizedText === 0){
                result = { count:sanitizedText, results: []}
            }
            else {
            const carXPath = '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a'
            const resultsCarXPath = (await page.locator(carXPath).allTextContents())

            result = { count: sanitizedText, results: resultsCarXPath}

                
            }
            expect(result.count).toBeGreaterThan(0)
            const found = result.results.every((value) => value.includes(config.tests[4].filter))
            expect(found).toBe(true)
            await page.close()
        
        })

        test("should not return a list of car with some name and with a price filter if from filter is greater than to filter", async ({context}) => {
            
            const page = await context.newPage()
            let result
            await page.goto(config.global)
            
            const linkToPesquisaAvancada = page.locator('//*[@id="home"]/section[1]/div/div/div/div[3]/div/div[2]/a')
            await linkToPesquisaAvancada.click()

            const filtroDePrecoDe =  page.locator('//*[@id="priceStart"]')
            const filtroDePrecoAte = page.locator('//*[@id="priceEnd"]')

            await filtroDePrecoDe.focus()
            console.log(config.tests[5])
            await page.waitForTimeout(2000)
            await filtroDePrecoDe.fill(config.tests[5].de)
            
            await filtroDePrecoAte.focus()
            await filtroDePrecoAte.fill(config.tests[5].ate)
            
            const nameTextBox = page.locator('//*[@id="searchTerm"]')
            await nameTextBox.focus()
            await page.waitForTimeout(2000)
            await nameTextBox.fill(config.tests[5].filter)
            const searchUsedButtom = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[12]/a[4]')
            await page.waitForTimeout(2000)
            await searchUsedButtom.click()
            
            const resultsXPath = page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
            await page.waitForTimeout(2000)
            const text = await resultsXPath.textContent()
            const sanitizedText = parseInt(text.replace("<strong>", "").replace("</strong>","").split()[0])
            console.log(sanitizedText)
            if(sanitizedText === 0){
                result = { count:sanitizedText, results: []}
            }
            else {
            const carXPath = '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a'
            const resultsCarXPath = await page.locator(carXPath).allTextContents()

            result = { count: sanitizedText, results: resultsCarXPath}

                
            }
            expect(result.count).toBe(0)

            await page.waitForTimeout(2000)
            const pesquisaSemResultadosLabel = await ( page.locator('//*[@id="no-results"]/div/h3')).textContent()
            expect(pesquisaSemResultadosLabel).toBe("Pesquisa sem resultados")
            await page.close()
        
        })

        test("should not return a list of car with some name and with a price filter if from filter is 0 and to filter is 0", async ({context}) => {
            
            //AVISO: este teste é suposto falhar
            const page = await context.newPage()
            let result
            await page.goto(config.global)
            
            const linkToPesquisaAvancada = page.locator('//*[@id="home"]/section[1]/div/div/div/div[3]/div/div[2]/a')
            await linkToPesquisaAvancada.click()
            const buttonDropdownCombustivel = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[5]/div/div/button')
            await buttonDropdownCombustivel.click()

            const filtroDePrecoDe =  page.locator('//*[@id="priceStart"]')
            const filtroDePrecoAte = page.locator('//*[@id="priceEnd"]')

            await filtroDePrecoDe.focus()
            await filtroDePrecoDe.fill(config.tests[6].de)

            await filtroDePrecoDe.press("Tab")

            await filtroDePrecoAte.focus()
            await filtroDePrecoAte.fill(config.tests[6].ate)
            await filtroDePrecoAte.press("Tab")
            const nameTextBox = page.locator('//*[@id="searchTerm"]')
            await nameTextBox.focus()
            await nameTextBox.fill(config.tests[6].filter)
            const searchUsedButtom = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[12]/a[4]')
            await searchUsedButtom.click()
            
            const resultsXPath = await page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
            await page.waitForTimeout(2000)
            const text = await resultsXPath.textContent()
            const sanitizedText = parseInt(text.replace("<strong>", "").replace("</strong>","").split()[0])
            console.log(sanitizedText)
            if(sanitizedText === 0){
                result = { count:sanitizedText, results: []}
            }
            else {
            const carXPath = '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a'
            const resultsCarXPath = (await page.locator(carXPath).allTextContents())

            result = { count: sanitizedText, results: resultsCarXPath}

                
            }
            expect(result.count).toBe(0)

            const pesquisaSemResultadosLabel = page.locator('//*[@id="no-results"]/div/h3')
            expect(pesquisaSemResultadosLabel).toContainText('Pesquisa sem resultados')
            await page.close()
        
        })

        test("should not return a list of car with some name and with a price filter if from filter is -2 and to filter is -1", async ({context}) => {
            
            //AVISO: este teste é suposto falhar
            const page = await context.newPage()
            let result
            await page.goto(config.global)
            
            const linkToPesquisaAvancada = page.locator('//*[@id="home"]/section[1]/div/div/div/div[3]/div/div[2]/a')
            await linkToPesquisaAvancada.click()
            const buttonDropdownCombustivel = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[5]/div/div/button')
            await buttonDropdownCombustivel.click()

			//Aplicação de técnica de valor fronteira

            const filtroDePrecoDe =  page.locator('//*[@id="priceStart"]')
            const filtroDePrecoAte = page.locator('//*[@id="priceEnd"]')

            await filtroDePrecoDe.focus()
            await filtroDePrecoDe.fill(config.tests[7].de)

            await filtroDePrecoDe.press("Tab")

            await filtroDePrecoAte.focus()
            await filtroDePrecoAte.fill(config.tests[7].ate)
            await filtroDePrecoAte.press("Tab")
            const nameTextBox = page.locator('//*[@id="searchTerm"]')
            await nameTextBox.focus()
            await nameTextBox.fill(config.tests[7].filter)
            const searchUsedButtom = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[12]/a[4]')
            await searchUsedButtom.click()
            
            const resultsXPath = await page.locator(`//*[@id="search"]/form/section[2]/div/div[1]/div[1]/h2`)
            await page.waitForTimeout(2000)
            const text = await resultsXPath.textContent()
            const sanitizedText = parseInt(text.replace("<strong>", "").replace("</strong>","").split()[0])
            console.log(sanitizedText)
            if(sanitizedText === 0){
                result = { count:sanitizedText, results: []}
            }
            else {
            const carXPath = '//article[@class="vehicle-card"]//h3[@itemprop="name"]/a'
            const resultsCarXPath = (await page.locator(carXPath).allTextContents())

            result = { count: sanitizedText, results: resultsCarXPath}

                
            }
            expect(result.count).toBe(0)

            const pesquisaSemResultadosLabel = page.locator('//*[@id="no-results"]/div/h3')
            expect(pesquisaSemResultadosLabel).toContainText('Pesquisa sem resultados')
            await page.close()
        
        })
    })
}

