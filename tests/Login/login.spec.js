const config = require("../../test-config.json").emails;

const { test, expect } = require('@playwright/test');

export default function loginTests(email) {
	test.describe('Login Form Tests' + email, () => {
		test.use({ storageState: 'cookies.json' });

		test('should successfully log in with valid credentials', async ({ page }) => {

			await page.goto(config.global);
			const context = page.context();

			const loginBtn = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button')

			if (loginBtn.isVisible) {
				await loginBtn.click()
			}

			const emailInput = page.locator('//*[@id="username"]')
			if (emailInput.isVisible) {
				emailInput.fill(email);
			}

			const continueBtn = page.locator('//*[@id="submit-username"]')
			if (continueBtn.isVisible) {
				await continueBtn.click()
			}

			const humanInput = page.locator('//*[@id="form-hCaptcha"]/div')
			if (humanInput.isVisible()) {
				await page.pause();
			}

			const passwordInput = page.locator('//*[@id="current-password"]')
			const tokenInput = page.locator('//*[@id="token"]')

			if (passwordInput.isVisible() && !tokenInput.isVisible()) {
				passwordInput.fill("8h![RW5£F?1C")
				const continueValidBtn = page.locator('#btn-pwd-submit')
				if (continueValidBtn.isVisible() && continueValidBtn.isEnabled()) {
					await continueValidBtn.click()
				}
			} else if (tokenInput.isVisible()) {
				await page.pause()
				const continueValidBtn = page.locator('#btn-token-submit')
				if (await continueValidBtn.isVisible() && await continueValidBtn.isEnabled()) {
					await continueValidBtn.click()
				}
			}



			const continueImageWait = page.locator('//*[@id="content"]/header/div')
			if (continueImageWait.isVisible()) {
				await page.waitForTimeout(1500)
			}

			const isLoggedIn = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/a/span');
			const textOla = (await isLoggedIn.textContent()).trim();
			await context.storageState({ path: `${process.cwd()}/${email.replace('@', '_')}.json` });
			await expect(textOla).toContain('Olá');
		});
	});
};
