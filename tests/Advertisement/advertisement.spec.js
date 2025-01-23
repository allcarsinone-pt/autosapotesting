import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';
import { describe } from 'node:test';
import { url } from 'inspector';
const config = require("../../test-config.json").createAdvertisement;
let page, context;

export default function createAdvertisement() {
    describe('Create car advertisement', () => {

        /*test('should create a car ad', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);


            const newAd = page.locator('//*[@id="app"]/div[2]/header/div/div/div[3]/nav/ul/li[1]/a');
            await newAd.click();

            const [left, middle, right] = config.tests[0].matricula.split('-');

            const matriculaE = page.locator('//*[@id="plateLeft"]');
            const matriculaM = page.locator('//*[@id="plateMiddle"]');
            const matriculaR = page.locator('//*[@id="plateRight"]')

            await matriculaE.fill(left);
            await matriculaM.fill(middle);
            await matriculaR.fill(right);

            let buttonContinue = page.locator('//*[@id="btnVerify"]');
            await buttonContinue.click();

            const vin = page.locator('//*[@id="VIN"]');
            const brand = page.locator('//*[@id="IdBrand"]');
            const model = page.locator('//*[@id="IdModel"]');
            const version = page.locator('//*[@id="IdVersion"]');
            const bodyType = page.locator('//*[@id="IdBodyType"]');
            const fuel = page.locator('//*[@id="IdFuel"]');
            const transmission = page.locator('//*[@id="IdTransmission"]');
            const hp = page.locator('//*[@id="HP"]');
            const cc = page.locator('//*[@id="CC"]');
            const doors = page.locator('//*[@id="Doors"]');
            const seats = page.locator('//*[@id="Seats"]');
            const color = page.locator('//*[@id="IdColor"]');
            const productionYear = page.locator('//*[@id="ProductionYear"]');
            const oriNational = page.locator('//*[@id="nacional"]');
            buttonContinue = page.locator('//*[@id="vehicleInfo"]/div[3]/div/a[2]');

            await vin.fill(config.tests[0].vin);
            let brandValue = config.tests[0].brand;
            await brand.selectOption({ value: brandValue });
            let modelValue = config.tests[0].model;
            await model.selectOption({ value: modelValue });
            let versionValue = config.tests[0].version;
            await version.selectOption({ value: versionValue });
            let bodyValue = config.tests[0].bodyType;
            await bodyType.selectOption({ value: bodyValue });
            let fuelValue = config.tests[0].fuel;
            await fuel.selectOption({ value: fuelValue });
            let transmissionValue = config.tests[0].transmission;
            await transmission.selectOption({ value: transmissionValue });
            hp.fill(config.tests[0].hp);
            cc.fill(config.tests[0].cc);
            doors.fill(config.tests[0].doors);
            seats.fill(config.tests[0].seats);
            let colorValue = config.tests[0].color;
            await color.selectOption({ value: colorValue });
            productionYear.fill(config.tests[0].productionYear);
            oriNational.fill(config.tests[0].productionYear);

            await buttonContinue.click();

            let menuOption = page.locator('//*[@id="myTab"]/li[2]/a');
            await menuOption.click()

            let additionalFeatures = page.locator('//*[@id="myTabContent"]/div[2]/ul[1]/li[1]/label/span');
            await additionalFeatures.click();

            additionalFeatures = page.locator('//*[@id="myTabContent"]/div[2]/ul[1]/li[2]/label/span');
            await additionalFeatures.click();

            buttonContinue = page.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();


            const kms = page.locator('//*[@id="Kms"]');
            const price = page.locator('//*[@id="Price"]');
            const description = page.locator('//*[@id="Description"]');

            kms.fill(config.tests[0].kms);
            price.fill(config.tests[0].price);
            description.fill(config.tests[0].description);

            buttonContinue = page.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="fotos"]/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="dados"]/div/div[3]/a[2]');
            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="confirmChangesModal"]/div/div/div[3]/button[2]');
            await buttonContinue.click();

            const vehicleName = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/h2[1]');
            kms = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[1]');
            productionYear = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[2]');
            const matricula = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[3]');

            expect(vehicleName.textContent()).toBe('Audi A4');
            expect(kms.textContent()).toBe('20.000 Km');
            expect(productionYear.textContent()).toBe(2020);
            expect(matricula.textContent()).toBe('10-AA-15');

        });
*/
        test('should create a car ad with VIN instead of matricula', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);

            await page.pause();

            const standPage = page.locator('//*[@id="navbarCollapse"]/ul/li[3]/a');
            await standPage.click();

            await page.waitForTimeout(2000);
            let pages = await context.pages();


            context.page = pages[2];
            await page.bringToFront();
            await page.waitForTimeout(2000);
            const login = page.locator('//*[@id="account"]/section/div[2]/a[1]');
            await page.focus();
            await login.click();

            const newAd = page.locator('//*[@id="app"]/div[2]/header/div/div/div[3]/nav/ul/li[1]/a');
            await newAd.click();

            let vin = page.locator('//*[@id="dados"]/div/div[2]/div/fieldset[1]/div[2]/a');
            await vin.click();

            vin = newPage.locator('//*[@id="vin"]');
            await vin.fill(config.tests[1].vin);

            let buttonContinue = newPage.locator('//*[@id="btnVerify"]');
            await buttonContinue.click();

            const [left, middle, right] = config.tests[0].matricula.split('-');

            const matriculaE = newPage.locator('//*[@id="plateLeft"]');
            const matriculaM = newPage.locator('//*[@id="plateMiddle"]');
            const matriculaR = newPage.locator('//*[@id="plateRight"]');
            const brand = newPage.locator('//*[@id="IdBrand"]');
            const model = newPage.locator('//*[@id="IdModel"]');
            const version = newPage.locator('//*[@id="IdVersion"]');
            const bodyType = newPage.locator('//*[@id="IdBodyType"]');
            const fuel = newPage.locator('//*[@id="IdFuel"]');
            const transmission = newPage.locator('//*[@id="IdTransmission"]');
            const hp = newPage.locator('//*[@id="HP"]');
            const cc = newPage.locator('//*[@id="CC"]');
            const doors = newPage.locator('//*[@id="Doors"]');
            const seats = newPage.locator('//*[@id="Seats"]');
            const color = newPage.locator('//*[@id="IdColor"]');
            const productionYear = newPage.locator('//*[@id="ProductionYear"]');
            const oriNational = newPage.locator('//*[@id="nacional"]');
            buttonContinue = newPage.locator('//*[@id="vehicleInfo"]/div[3]/div/a[2]');


            await matriculaE.fill(left);
            await matriculaM.fill(middle);
            await matriculaR.fill(right);
            await vin.fill(config.tests[1].vin);
            let brandValue = config.tests[1].brand;
            await brand.selectOption({ value: brandValue });
            let modelValue = config.tests[1].model;
            await model.selectOption({ value: modelValue });
            let versionValue = config.tests[1].version;
            await version.selectOption({ value: versionValue });
            let bodyValue = config.tests[1].bodyType;
            await bodyType.selectOption({ value: bodyValue });
            let fuelValue = config.tests[1].fuel;
            await fuel.selectOption({ value: fuelValue });
            let transmissionValue = config.tests[0].transmission;
            await transmission.selectOption({ value: transmissionValue });
            await hp.fill(config.tests[1].hp);
            await cc.fill(config.tests[1].cc);
            await doors.fill(config.tests[1].doors);
            await seats.fill(config.tests[1].seats);
            let colorValue = config.tests[1].color;
            await color.selectOption({ value: colorValue });
            await productionYear.fill(config.tests[1].productionYear);
            await oriNational.fill(config.tests[1].productionYear);

            await buttonContinue.click();

            let menuOption = newPage.locator('//*[@id="myTab"]/li[2]/a');
            await menuOption.click()

            let additionalFeatures = newPage.locator('//*[@id="myTabContent"]/div[2]/ul[1]/li[5]');
            await additionalFeatures.click();

            menuOption = newPage.locator('//*[@id="myTab"]/li[3]/a');

            additionalFeatures = newPage.locator('//*[@id="myTabContent"]/div[3]/ul[1]/li[1]/label');
            await additionalFeatures.click();

            buttonContinue = newPage.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            const kms = newPage.locator('//*[@id="Kms"]');
            const price = newPage.locator('//*[@id="Price"]');
            const description = newPage.locator('//*[@id="Description"]');

            await kms.fill(config.tests[1].kms);
            await price.fill(config.tests[1].price);
            await description.fill(config.tests[1].description);

            buttonContinue = newPage.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = newPage.locator('//*[@id="fotos"]/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = newPage.locator('//*[@id="dados"]/div/div[3]/a[2]');
            await buttonContinue.click();

            buttonContinue = newPage.locator('//*[@id="confirmChangesModal"]/div/div/div[3]/button[2]');
            await buttonContinue.click();

            const vehicleName = newPage.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/h2[1]');
            kms = newPage.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[1]');
            productionYear = newPage.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[2]');
            const matricula = newPage.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[3]');

            expect(vehicleName.textContent()).toBe('Audi A4');
            expect(kms.textContent()).toBe('20.000 Km');
            expect(productionYear.textContent()).toBe(2020);
            expect(matricula.textContent()).toBe('20-BB-20');

        });

        test('should create a car ad with VIN instead of matricula withoutd additional features', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);

            const newAd = page.locator('//*[@id="app"]/div[2]/header/div/div/div[3]/nav/ul/li[1]/a');
            await newAd.click();

            let vin = page.locator('//*[@id="dados"]/div/div[2]/div/fieldset[1]/div[2]/a');
            await vin.click();

            vin = page.locator('//*[@id="vin"]');
            await vin.fill(config.tests[2].vin);

            buttonContinue = page.locator('//*[@id="btnVerify"]');
            await buttonContinue.click();

            const [left, middle, right] = config.tests[0].matricula.split('-');

            const matriculaE = page.locator('//*[@id="plateLeft"]');
            const matriculaM = page.locator('//*[@id="plateMiddle"]');
            const matriculaR = page.locator('//*[@id="plateRight"]');
            const brand = page.locator('//*[@id="IdBrand"]');
            const model = page.locator('//*[@id="IdModel"]');
            const version = page.locator('//*[@id="IdVersion"]');
            const bodyType = page.locator('//*[@id="IdBodyType"]');
            const fuel = page.locator('//*[@id="IdFuel"]');
            const transmission = page.locator('//*[@id="IdTransmission"]');
            const hp = page.locator('//*[@id="HP"]');
            const cc = page.locator('//*[@id="CC"]');
            const doors = page.locator('//*[@id="Doors"]');
            const seats = page.locator('//*[@id="Seats"]');
            const color = page.locator('//*[@id="IdColor"]');
            const productionYear = page.locator('//*[@id="ProductionYear"]');
            const oriNational = page.locator('//*[@id="nacional"]');
            buttonContinue = page.locator('//*[@id="vehicleInfo"]/div[3]/div/a[2]');


            await matriculaE.fill(left);
            await matriculaM.fill(middle);
            await matriculaR.fill(right);
            await vin.fill(config.tests[2].vin);
            let brandValue = config.tests[2].brand;
            await brand.selectOption({ value: brandValue });
            let modelValue = config.tests[2].model;
            await model.selectOption({ value: modelValue });
            let versionValue = config.tests[2].version;
            await version.selectOption({ value: versionValue });
            let bodyValue = config.tests[2].bodyType;
            await bodyType.selectOption({ value: bodyValue });
            let fuelValue = config.tests[2].fuel;
            await fuel.selectOption({ value: fuelValue });
            let transmissionValue = config.tests[2].transmission;
            await transmission.selectOption({ value: transmissionValue });
            await hp.fill(config.tests[2].hp);
            await cc.fill(config.tests[2].cc);
            await doors.fill(config.tests[2].doors);
            await seats.fill(config.tests[2].seats);
            let colorValue = config.tests[2].color;
            await color.selectOption({ value: colorValue });
            await productionYear.fill(config.tests[2].productionYear);
            await oriNational.fill(config.tests[2].productionYear);

            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            const kms = page.locator('//*[@id="Kms"]');
            const price = page.locator('//*[@id="Price"]');
            const description = page.locator('//*[@id="Description"]');

            await kms.fill(config.tests[2].kms);
            await price.fill(config.tests[2].price);
            await description.fill(config.tests[2].description);

            buttonContinue = page.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="fotos"]/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="dados"]/div/div[3]/a[2]');
            await buttonContinue.click();

            buttonContinue = page.locator('//*[@id="confirmChangesModal"]/div/div/div[3]/button[2]');
            await buttonContinue.click();

            const vehicleName = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/h2[1]');
            kms = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[1]');
            productionYear = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[2]');
            const matricula = page.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[3]');

            expect(vehicleName.textContent()).toBe('Audi A4');
            expect(kms.textContent()).toBe('20.000 Km');
            expect(productionYear.textContent()).toBe(2020);
            expect(matricula.textContent()).toBe('20-BB-20');

        });

    });

}