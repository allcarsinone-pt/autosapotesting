import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';
import { describe } from 'node:test';
import { url } from 'inspector';
const config = require("../../test-config.json").registarUtilizador;
let page, context;

function generatePassword() {
  const uppercase = randomstring.generate({ length: 2, charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });
  const lowercase = randomstring.generate({ length: 4, charset: 'abcdefghijklmnopqrstuvwxyz' });
  const numbers = randomstring.generate({ length: 2, charset: '0123456789' });
  const symbols = randomstring.generate({ length: 2, charset: '!@#$%^&*()-_+=<>?{}[]~' });

  const password = (uppercase + lowercase + numbers + symbols)
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return password;
}

export default function registarUtilizador() {
  describe('User register', () => {
  
	test.use({ storageState: 'cookies.json' });

    test('should register an user', async ({ context }) => {
      page = await context.newPage();
      await page.goto(config.global);
      await page.waitForTimeout(5000);

      const cookieScreen = page.locator('//*[@id="qc-cmp2-ui"]');
      if (await cookieScreen.isVisible()) {
        const acceptCookies = page.locator('//*[@id="qc-cmp2-ui"]/div[2]/div/button[3]');
        await acceptCookies.click();
      }
      const buttonRegister = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button');
      if (await buttonRegister.isVisible()) {
        await buttonRegister.click();
      }

      const emailInput = page.locator('//*[@id="username"]');
      await emailInput.fill(config.tests[0].email);

      let buttonContinue = page.locator('//*[@id="submit-username"]');
      await buttonContinue.click();

      // CAPTCHA - necessário efetuar manualmente
      if (await page.locator('//*[@id="/html/body/div[1]/div[1]/div/div/div/form/div"]').isVisible()) {
        await page.pause();
      }

      const gender = page.locator('//*[@id="registerGender"]/div[2]');
      const acceptTerms = page.locator('//*[@id="terms"]');

      if (!(await gender.isVisible())) {
        console.log("Email already registered");
        await context.close();
      }

      await page.pause(); // Pausa para colocar código de validação recebido no email
      await gender.click();
      await acceptTerms.click();

      buttonContinue = page.locator('//*[@id="btn-token-submit"]');
      await buttonContinue.click();

      const acceptCreatePassword = page.locator('//*[@id="content"]/div[3]/div[2]/a');
      await acceptCreatePassword.click();

      const password = page.locator('//*[@id="current-password"]');
      const confirmPassword = page.locator('//*[@id="new-password"]');

      const passwordRegister = generatePassword();
      await password.fill(passwordRegister);
      await confirmPassword.fill(passwordRegister + '1'); // Botão não atualiza automaticamente, necessário apagar 1 caracter e dar tab

      await confirmPassword.press('End')
      await confirmPassword.press('Backspace');
      await confirmPassword.press('Tab');

      console.log(passwordRegister);

      await page.pause(); // Pausa para colocar código de validação recebido no email

      buttonContinue = page.locator('//*[@id="btn-add-password"]');
      await buttonContinue.click();


      const acceptConditions = page.locator('//*[@id="user"]/section/div/div/section/div/form/fieldset[2]/div[1]/ul/li/label');
      await acceptConditions.click();

      const saveConditions = page.locator('//*[@id="user"]/section/div/div/section/div/form/div/div/button[2]');
      await saveConditions.click();

      await page.waitForTimeout(2000);

      const isLoggedIn = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/div/span');

      const emailText = await isLoggedIn.textContent();
      expect(emailText).toContain('Olá');


    });

    test('should not register an user because passwords doesnt have the min requirements', async ({ context }) => {

      await page.goto(config.global);

      const buttonRegister = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button');
      if (await buttonRegister.isVisible()) {
        await buttonRegister.click();
      }

      const emailInput = page.locator('//*[@id="username"]');
      await emailInput.fill(config.tests[1].email);

      let buttonContinue = page.locator('//*[@id="submit-username"]');
      await buttonContinue.click();

      if (await page.locator('//*[@id="/html/body/div[1]/div[1]/div/div/div/form/div"]').isVisible()) {
        await page.pause();
      }

      const gender = page.locator('//*[@id="registerGender"]/div[2]');
      const acceptTerms = page.locator('//*[@id="terms"]');

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
      const logo = page.locator('//*[@id="content"]/header/div');
      const rulesList = page.locator('ul.align-left.rules li');

      await password.fill('1234567890');
      await confirmPassword.fill('1234567890');

      await logo.click();

      const invalidRules = await rulesList.evaluateAll((elements) => {
        return elements.filter(element => !element.classList.contains('icon-ok')).length;
      })

      buttonContinue = page.locator('//*[@id="btn-add-password"]');

      expect(buttonContinue).toBeDisabled();
      expect(invalidRules).toBeGreaterThan(0);

    });

    test('should not register an user because passwords are different', async ({ context }) => {

      await page.goto(config.global);

      const buttonRegister = page.locator('//*[@id="navbarCollapse"]/ul/li[6]/button');
      if (await buttonRegister.isVisible()) {
        await buttonRegister.click();
      }

      const emailInput = page.locator('//*[@id="username"]');
      await emailInput.fill(config.tests[2].email);

      let buttonContinue = page.locator('//*[@id="submit-username"]');
      await buttonContinue.click();

      if (await page.locator('//*[@id="/html/body/div[1]/div[1]/div/div/div/form/div"]').isVisible()) {
        await page.pause();
      }

      const gender = page.locator('//*[@id="registerGender"]/div[2]');
      const acceptTerms = page.locator('//*[@id="terms"]');

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

      const logo = page.locator('//*[@id="content"]/header/div');
      await logo.click();

      const textDifferentPasswords = page.locator('//*[@id="messageWarning"]');


      buttonContinue = page.locator('//*[@id="btn-add-password"]');

      expect(buttonContinue).toBeDisabled();
      expect(textDifferentPasswords).toBeVisible();
      expect(textDifferentPasswords).toHaveText('As passwords não coincidem');


    });

    test('should register an user as a seller', async ({ context }) => {

      await page.goto(config.global);

      const buttonAnnounce = page.locator('//*[@id="navbarCollapse"]/ul/li[3]/a');
      if (await buttonAnnounce.isVisible()) {
        await buttonAnnounce.click();
      }

      const joinButton = page.locator('//*[@id="account"]/section/div[2]/a[1]');
      if (await joinButton.isVisible()) {
        await joinButton.click();
      }

      const particularButton = page.locator('//*[@id="account"]/section/div[2]/a[1]');
      if (await particularButton.isVisible()) {
        await particularButton.click();
      }

      let NIFInput = page.locator('//*[@id="TaxNumber"]');
      let mobileInput = page.locator('//*[@id="ManagerMobile"]');
      let billingAddress = page.locator('//*[@id="BillingAddress"]');
      let postalCode1 = page.locator('//*[@id="BillingZipCode4"]');
      let postalCode2 = page.locator('//*[@id="BillingZipCode3"]');
      let locality = page.locator('//*[@id="BillingZipCodeCity"]');
      let district = page.locator('//*[@id="IdDistrict"]');
      let municipality = page.locator('//*[@id="IdCounty"]');
      let acceptTermsAndConditions = page.locator('//*[@id="account"]/section/div[2]/section/form/div[1]/ul/li/label/span')

      NIFInput.fill(config.tests[3].nif);
      mobileInput.fill(config.tests[3].mobile);
      billingAddress.fill(config.tests[3].billingAddress);
      postalCode1.fill(config.tests[3].postalCode1);
      postalCode2.fill(config.tests[3].postalCode2);
      locality.fill(config.tests[3].locality);
      let districtValue = config.tests[3].district;
      await district.selectOption({ value: districtValue });
      let municipalityValue = config.tests[3].municipality;
      await municipality.selectOption({ value: municipalityValue });
      await acceptTermsAndConditions.click();

      let buttonSubmit = page.locator('//*[@id="account"]/section/div[2]/section/form/div[3]/div[2]/a[1]');
      await buttonSubmit.click();

      await page.waitForNavigation({ url: 'https://auto-frontoffice.sapo.pt/dashboard' });
      let backOfficeText = page.locator('//*[@id="app"]/div[2]/header/div/div/div[1]/h2');
      let ads = page.locator('//*[@id="dashboard"]/div/div[4]/section/div[1]/h3');
      let noAds = page.locator('//*[@id="dashboard"]/div/div[4]/section/div[2]/h3');
      expect(backOfficeText).toHaveText('BackOffice');
      expect(ads).toHaveText('Top Anúncios');
      expect(noAds).toHaveText('Ainda não existem anúncios');


    });

  })
}
