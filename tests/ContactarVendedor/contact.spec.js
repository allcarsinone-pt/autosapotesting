
const config = require("../../test-config.json").contactVendor;
const { test, expect } = require('@playwright/test');

export default function contactTests() {

	test.describe('Contact Vendor Form Tests', () => {

	  test.use({ storageState: 'cookies.json' });
	  test('should successfully log in with valid credentials', async ({ page }) => {
		
		await page.goto(config.global);
		await page.pause()
		const advSearchBtn = page.locator('//*[@id="home"]/section[1]/div/div/div/div[3]/div/div[2]/a')
		await advSearchBtn.click()
		const inputKms = page.locator('//*[@id="priceStart"]')
		await inputKms.fill(config.tests[0].kmsStart)
		const inputEndKms = page.locator('//*[@id="priceEnd"]')
		await inputEndKms.fill(config.tests[0].kmsStart)
		await inputEndKms.press('Tab')
		await page.waitForTimeout(1000)
		const searchBtn = page.locator('//*[@id="used-search-filter"]/div/div[2]/div[2]/div/div[12]/a[4]')
		await page.waitForTimeout(1000)
		const searchName = (await searchBtn.textContent());
		expect(searchName).toContain('(1)')
		await searchBtn.click()
		await page.waitForTimeout(1000)
		const carBtn = page.locator('//*[@id="search"]/form/section[2]/div/div[2]/div/article/div[2]/h3/a/span')
		await carBtn.click()
		const carName = page.locator('//*[@id="detail"]/section[2]/div[1]/div/h1')
		const name = (await carName.textContent());
		expect(name).toBe('BMW Série 3 318 d Touring Advantage')
		const contactBtn = page.locator('//*[@id="resume"]/div[4]/a')
		await contactBtn.click()

		/* TO ASSUME IS LOGGED IN
		const nameBtn = page.locator('//*[@id="name"]')
		await nameBtn.fill(config.tests[0].name)
		const emailBtn = page.locator('//*[@id="email"]')
		await emailBtn.fill(config.tests[0].email)
		const phoneBtn = page.locator('//*[@id="phone"]')
		await phoneBtn.fill(config.tests[0].phone)
		const AuthBtn = page.locator('//*[@id="detail"]/div[1]/div/div/form/div/section[1]/div/div[2]/div/fieldset[6]/div[2]/ul/li/label/span')
		await AuthBtn.click()
		*/


		//let fuelValue = config.tests[0].fuel;
		//await fuelValue.selectOption({ value: fuelValue });

		//[@id="detail"]/div[1]/div/div/form/div/section[1]/div/div[2]/div/fieldset[2]/div/div/div/div/button

		//[@id="detail"]/div[1]/div/div/form/div/section[1]/div/div[2]/div/fieldset[3]/div/div[1]/div[1]

		//matricula p1 //*[@id="PlateStart"]

		//matricula p2 //*[@id="PlateMid"]

		//matricula p3 //*[@id="PlateEnd"]

		//kms //*[@id="Kms"]


		//const retomaBtn = page.locator('//*[@id="name"]')
		//await retomaBtn.click()

		const human = page.locator('//*[@id="content"]')
		if (human.isVisible()) {
		    await page.pause();
		}

		const submitBtn = page.locator('//*[@id="detail"]/div[1]/div/div/form/div/section[1]/div/div[2]/div/div/div/button')
		await submitBtn.click()


		//*[@id="detail"]/div[1]/div/div/form/div/section[1]/div/div[2]/div/fieldset[6]/div[2]/ul/li/label/span

		//const dropdownBtn = page.locator('//*[@id="detail"]/div[1]/div/div/form/div/section[1]/div/div[2]/div/fieldset[4]/div/div/div/div')
		//await dropdownBtn.selectOption({value: })


	  });
	});
};
