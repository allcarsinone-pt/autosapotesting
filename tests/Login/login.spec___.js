const config = require("../../test-config.json").loginUtilizador;

const { test, expect } = require('@playwright/test');

test.describe('Login Form Tests', () => {

  test('should successfully log in with valid credentials', async ({ page }) => {
    
    await page.goto(config.global);

    const loginBtn = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button')

    if (loginBtn.isVisible()) {
        await loginBtn.click()
    }

    const emailInput = page.locator('//*[@id="username"]')
    if (emailInput.isVisible()) {
        emailInput.fill(config.tests[0].email);
    }

    const continueBtn = page.locator('//*[@id="submit-username"]')
    if (continueBtn.isVisible()) {
        await continueBtn.click()
    }

    const humanInput = page.locator('//*[@id="form-hCaptcha"]/div')
    if (humanInput.isVisible()) {
        await page.pause();
    }

    const validInput = page.locator('//*[@id="token"]')
    if (validInput.isVisible()) {
        await page.pause();
    }

    const continueValidBtn = page.locator('//*[@id="btn-token-submit"]')
    if (continueValidBtn.isVisible() && continueValidBtn.isEnabled ) {
        await continueValidBtn.click()
    }
    
    const continueImageWait = page.locator('//*[@id="content"]/header/div')
    if (continueImageWait.isVisible()) {
        await page.waitForTimeout(1500)
    }

    const isLoggedIn = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/a/span');
    const textOla = (await isLoggedIn.textContent()).trim();
    await expect(textOla).toContain('Olá');
  });
});
