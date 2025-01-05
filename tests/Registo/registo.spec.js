import { test, expect } from '@playwright/test';
import { generate } from "generate-password";
import { describe } from 'node:test';
const config = require("../../test-config.json").registarUtilizador;
let context;
let page;

var passwordValue = generate({
  length: 10,
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: true
})

describe('User register', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(config.global);
    await page.waitForTimeout(5000);

    const cookieScreen = page.locator('//*[@id="qc-cmp2-ui"]');
    if (await cookieScreen.isVisible()) {
      const acceptCookies = page.locator('//*[@id="qc-cmp2-ui"]/div[2]/div/button[3]');
      await acceptCookies.click();
    }

  })


  test('should register an user', async ({ context }) => {

    await page.goto(config.global);

    const buttonRegister = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button');
    if (await buttonRegister.isVisible()) {
      await buttonRegister.click();
    }

    const emailInput = page.locator('//*[@id="username"]');
    await emailInput.fill(config.tests[0].email);

    let buttonContinue = page.locator('//*[@id="submit-username"]');
    await buttonContinue.click();

    if (await page.locator('//*[@id="/html/body/div[1]/div[1]/div/div/div/form/div"]').isVisible()) {
      await page.pause();
    }

    const gender = page.locator('//*[@id="registerGender"]/div[2]');
    const acceptTerms = page.locator('//*[@id="terms"]');

    // Verificar abordagem
    if (!(await gender.isVisible())) {
      console.log("Email already registered");
      await context.close();
    }

    await page.pause(); // Pausa para colocar código de validação recebido no email
    await gender.click();
    await acceptTerms.click();

    buttonContinue = page.locator('//*[@id="btn-token-submit"]');
    await page.waitForTimeout(3000);
    await buttonContinue.click();

    const acceptCreatePassword = page.locator('//*[@id="content"]/div[3]/div[2]/a');
    await acceptCreatePassword.click();

    const password = page.locator('//*[@id="current-password"]');
    const confirmPassword = page.locator('//*[@id="new-password"]');

    await password.fill(passwordValue);
    await confirmPassword.fill(passwordValue);

    console.log(passwordValue);

    buttonContinue = page.locator('//*[@id="btn-add-password"]');
    await buttonContinue.click();

    await page.goto(config.global);

    const isLoggedIn = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/div/span');

    const emailText = await isLoggedIn.textContent();
    expect(emailText).toContain('Olá');

    await context.close();

  });

  test('should not register an user because passwords are different', async ({ context }) => {

    await page.goto(config.global);

    const buttonRegister = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button');
    if (await buttonRegister.isVisible()) {
      await buttonRegister.click();
    }

    const emailInput = page.locator('//*[@id="username"]');
    await emailInput.fill(config.tests[0].email);

    let buttonContinue = page.locator('//*[@id="submit-username"]');
    await buttonContinue.click();

    if (await page.locator('//*[@id="/html/body/div[1]/div[1]/div/div/div/form/div"]').isVisible()) {
      await page.pause();
    }

    const gender = page.locator('//*[@id="registerGender"]/div[2]');
    const acceptTerms = page.locator('//*[@id="terms"]');

    // Verificar abordagem
    if (!(await gender.isVisible())) {
      console.log("Email already registered");
      await context.close();
    }

    await page.pause(); // Pausa para colocar código de validação recebido no email
    await gender.click();
    await acceptTerms.click();

    buttonContinue = page.locator('//*[@id="btn-token-submit"]');
    await page.waitForTimeout(3000);
    await buttonContinue.click();

    const acceptCreatePassword = page.locator('//*[@id="content"]/div[3]/div[2]/a');
    await acceptCreatePassword.click();

    const password = page.locator('//*[@id="current-password"]');
    const confirmPassword = page.locator('//*[@id="new-password"]');

    await password.fill(passwordValue);
    await confirmPassword.fill(passwordValue + '1');

    buttonContinue = page.locator('//*[@id="btn-add-password"]');


    await context.close();

  });

})