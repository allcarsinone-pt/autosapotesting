import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';
import { url } from 'inspector';
const config = require("../../test-config.json").createAdvertisement;
let page, context;

export default function createAdvertisement() {
    describe('Create car advertisement', () => {

        test('should create a car ad', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);


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


    });

}