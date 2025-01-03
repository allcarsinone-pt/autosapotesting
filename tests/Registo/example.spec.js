import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

  const buttonRegister = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button')
  const emailInput = page.locator('//*[@id="username"]')
  let buttonContinue = page.locator('//*[@id="submit-username"]')
  const validationCode = page.locator('//*[@id="token"]')
  const gender = page.locator('//*[@id="registerGender"]/div[2]')
  const acceptTerms = page.locator('//*[@id="terms"]')
  const acceptCreatePassword = page.locator('//*[@id="content"]/div[3]/div[2]/a')
  const password = page.locator('//*[@id="current-password"]')
  const confirmPassword = page.locator('//*[@id="new-password"]')

  await page.goto('https://auto.sapo.pt/');
  buttonRegister.click()

  emailInput.fill("goncaloos10@gmail.com")

  buttonContinue.click()

  validationCode.fill('asd')
  gender.click()
  acceptTerms.click()

  buttonContinue = page.locator('//*[@id="btn-token-submit"]')
  buttonContinue.click()

  acceptCreatePassword.click()

  password.fill('Passwordboa123!')
  confirmPassword.fill('Passwordboa123!')

  buttonContinue = page.locator('//*[@id="btn-add-password"]')
  buttonContinue.click()

});