import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';
import { describe } from 'node:test';
import { url } from 'inspector';
const config = require("../../test-config.json").createAdvertisement;
let page, context;

export default function createAdvertisement() {
    describe('Create car advertisement', () => {
        test.use({ storageState: 'qts7_allcarsinone.pt.json' });

        test('should create a car ad', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);

            await page.pause();

            const standPage = page.locator('//*[@id="navbarCollapse"]/ul/li[3]/a');
            await standPage.click();

            await page.waitForTimeout(2000);
            let pages = await context.pages();


            const page2 = pages[1];
            await page2.bringToFront();
            await page2.waitForTimeout(2000);
            const login = page2.locator('//*[@id="account"]/section/div[2]/a[1]');
                                    
            await login.click();

            const newAd = page2.locator('//*[@id="app"]/div[2]/header/div/div/div[3]/nav/ul/li[1]/a');
            await newAd.click();

            const [left, middle, right] = config.tests[1].matricula.split('-');

            let matriculaE = page2.locator('//*[@id="plateLeft"]');
            let matriculaM = page2.locator('//*[@id="plateMiddle"]');
            let matriculaR = page2.locator('//*[@id="plateRight"]');
            await matriculaE.fill(left);
            await matriculaM.fill(middle);
            await matriculaR.fill(right);
            let buttonContinue = page2.locator('//*[@id="btnVerify"]').nth(0);;
            await buttonContinue.click();

            let vin = page2.locator('//*[@id="VIN"]');
            let brand = page2.locator('//*[@id="IdBrand"]');
            let version = page2.locator('//*[@id="IdVersion"]');
            let bodyType = page2.locator('//*[@id="IdBodyType"]');
            let model = page2.locator('//*[@id="IdModel"]');
            let fuel = page2.locator('//*[@id="IdFuel"]');
            let transmission = page2.locator('//*[@id="IdTransmission"]');
            let hp = page2.locator('//*[@id="HP"]');
            let cc = page2.locator('//*[@id="CC"]');
            let doors = page2.locator('//*[@id="Doors"]');
            let seats = page2.locator('//*[@id="Seats"]');
            let color = page2.locator('//*[@id="IdColor"]');
            let productionYear = page2.locator('//*[@id="ProductionYear"]');
            let plateDate = page2.locator('//*[@id="PlateDate"]');
            buttonContinue = page2.locator('//*[@id="vehicleInfo"]/div[3]/div/a[2]');

            await vin.fill(config.tests[0].vin);
            let brandValue = config.tests[0].brand;
            await brand.selectOption({ value: brandValue.toString() });
            let modelValue = config.tests[0].model;
            await model.selectOption({ value: modelValue.toString() });
            let versionValue = config.tests[0].version;
            await version.selectOption({ value: versionValue.toString() });
            let bodyValue = config.tests[0].bodyType;
            await bodyType.selectOption({ value: bodyValue.toString() });
            let fuelValue = config.tests[0].fuel;
            await fuel.selectOption({ value: fuelValue.toString() });
            let transmissionValue = config.tests[0].transmission;
            await transmission.selectOption({ value: transmissionValue.toString() });
            await hp.fill(config.tests[0].hp.toString());
            await cc.fill(config.tests[0].cc.toString());
            await doors.fill(config.tests[0].doors.toString());
            await seats.fill(config.tests[0].seats.toString());
            let colorValue = config.tests[0].color;
            await color.selectOption({ value: colorValue.toString() });
            await productionYear.fill(config.tests[0].productionYear.toString());
            await plateDate.fill(config.tests[0].plateDate);

            await buttonContinue.click();

            let menuOption = page2.locator('//*[@id="myTab"]/li[2]/a');
            await menuOption.click()

            let additionalFeatures = page2.locator('//*[@id="myTabContent"]/div[2]/ul[1]/li[1]/label/span');
            await additionalFeatures.click();

            buttonContinue = page2.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            let kms = page2.locator('//*[@id="Kms"]');
            let price = page2.locator('//*[@id="Price"]');
            let description = page2.locator('//*[@id="Description"]');

            await kms.fill(config.tests[0].kms.toString());
            await price.fill(config.tests[0].price.toString());
            await description.fill(config.tests[0].description.toString());

            buttonContinue = page2.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="fotos"]/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="dados"]/div/div[3]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="confirmChangesModal"]/div/div/div[3]/button[2]');
            await buttonContinue.click();

            await page2.waitForTimeout(2000);

            const vehicleName = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/h2[1]');
            kms = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[1]');
            productionYear = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[2]');
            const matricula = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[3]');

            await expect(vehicleName.textContent()).resolves.toBe('Audi A4')
            await expect(kms.textContent()).resolves.toBe('50.000 Km');
            await expect(productionYear.textContent()).resolves.toBe('2022');
            await expect(matricula.textContent()).resolves.toBe('90-MD-24');


        });

        test('should create a car ad with VIN instead of matricula', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);

            await page.pause();

            const standPage = page.locator('//*[@id="navbarCollapse"]/ul/li[3]/a');
            await standPage.click();

            await page.waitForTimeout(2000);
            let pages = await context.pages();


            const page2 = pages[1];
            await page2.bringToFront();
            await page2.waitForTimeout(2000);
            const login = page2.locator('//*[@id="account"]/section/div[2]/a[1]');
            await login.click();

            const newAd = page2.locator('//*[@id="app"]/div[2]/header/div/div/div[3]/nav/ul/li[1]/a');
            await newAd.click();

            let vin = page2.locator('//*[@id="dados"]/div/div[2]/div/fieldset[1]/div[2]/a');
            await vin.click();

            vin = page2.locator('//*[@id="vin"]');
            await vin.fill(config.tests[1].vin);

            let buttonContinue = page2.locator('//*[@id="btnVerify"]').nth(1);;
            await buttonContinue.click();

            const [left, middle, right] = config.tests[1].matricula.split('-');

            let matriculaE = page2.locator('//*[@id="plateLeft"]');
            let matriculaM = page2.locator('//*[@id="plateMiddle"]');
            let matriculaR = page2.locator('//*[@id="plateRight"]');
            let brand = page2.locator('//*[@id="IdBrand"]');
            let version = page2.locator('//*[@id="IdVersion"]');
            let bodyType = page2.locator('//*[@id="IdBodyType"]');
            let model = page2.locator('//*[@id="IdModel"]');
            let fuel = page2.locator('//*[@id="IdFuel"]');
            let transmission = page2.locator('//*[@id="IdTransmission"]');
            let hp = page2.locator('//*[@id="HP"]');
            let cc = page2.locator('//*[@id="CC"]');
            let doors = page2.locator('//*[@id="Doors"]');
            let seats = page2.locator('//*[@id="Seats"]');
            let color = page2.locator('//*[@id="IdColor"]');
            let productionYear = page2.locator('//*[@id="ProductionYear"]');
            let plateDate = page2.locator('//*[@id="PlateDate"]');
            buttonContinue = page2.locator('//*[@id="vehicleInfo"]/div[3]/div/a[2]');


            await matriculaE.fill(left);
            await matriculaM.fill(middle);
            await matriculaR.fill(right);
            let brandValue = config.tests[1].brand;
            await brand.selectOption({ value: brandValue.toString() });
            let modelValue = config.tests[1].model;
            await model.selectOption({ value: modelValue.toString() });
            let versionValue = config.tests[1].version;
            await version.selectOption({ value: versionValue.toString() });
            let bodyValue = config.tests[1].bodyType;
            await bodyType.selectOption({ value: bodyValue.toString() });
            let fuelValue = config.tests[1].fuel;
            await fuel.selectOption({ value: fuelValue.toString() });
            let transmissionValue = config.tests[0].transmission;
            await transmission.selectOption({ value: transmissionValue.toString() });
            await hp.fill(config.tests[1].hp.toString());
            await cc.fill(config.tests[1].cc.toString());
            await doors.fill(config.tests[1].doors.toString());
            await seats.fill(config.tests[1].seats.toString());
            let colorValue = config.tests[1].color;
            await color.selectOption({ value: colorValue.toString() });
            await productionYear.fill(config.tests[1].productionYear.toString());
            await plateDate.fill(config.tests[1].plateDate);

            await buttonContinue.click();

            let menuOption = page2.locator('//*[@id="myTab"]/li[2]/a');
            await menuOption.click()

            let additionalFeatures = page2.locator('//*[@id="myTabContent"]/div[2]/ul[1]/li[1]/label/span');
            await additionalFeatures.click();

            buttonContinue = page2.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            let kms = page2.locator('//*[@id="Kms"]');
            let price = page2.locator('//*[@id="Price"]');
            let description = page2.locator('//*[@id="Description"]');

            await kms.fill(config.tests[1].kms.toString());
            await price.fill(config.tests[1].price.toString());
            await description.fill(config.tests[1].description.toString());

            buttonContinue = page2.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="fotos"]/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="dados"]/div/div[3]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="confirmChangesModal"]/div/div/div[3]/button[2]');
            await buttonContinue.click();

            await page2.waitForTimeout(2000);

            const vehicleName = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/h2[1]');
            kms = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[1]');
            productionYear = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[2]');
            const matricula = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[3]');

            await expect(vehicleName.textContent()).resolves.toBe('Cadillac Escalade')
            await expect(kms.textContent()).resolves.toBe('8.000 Km');
            await expect(productionYear.textContent()).resolves.toBe('2024');
            await expect(matricula.textContent()).resolves.toBe('90-MD-24');

        });

        test('should create a car ad with VIN instead of matricula withoutd additional features', async ({ context }) => {
            page = await context.newPage();
            await page.goto(config.global);

            await page.pause();

            const standPage = page.locator('//*[@id="navbarCollapse"]/ul/li[3]/a');
            await standPage.click();

            await page.waitForTimeout(2000);
            let pages = await context.pages();


            const page2 = pages[1];
            await page2.bringToFront();
            await page2.waitForTimeout(2000);
            const login = page2.locator('//*[@id="account"]/section/div[2]/a[1]');
            await login.click();

            const newAd = page2.locator('//*[@id="app"]/div[2]/header/div/div/div[3]/nav/ul/li[1]/a');
            await newAd.click();

            let vin = page2.locator('//*[@id="dados"]/div/div[2]/div/fieldset[1]/div[2]/a');
            await vin.click();

            vin = page2.locator('//*[@id="vin"]');
            await vin.fill(config.tests[2].vin);

            let buttonContinue = page2.locator('//*[@id="btnVerify"]').nth(1);;
            await buttonContinue.click();

            const [left, middle, right] = config.tests[2].matricula.split('-');

            let matriculaE = page2.locator('//*[@id="plateLeft"]');
            let matriculaM = page2.locator('//*[@id="plateMiddle"]');
            let matriculaR = page2.locator('//*[@id="plateRight"]');
            let brand = page2.locator('//*[@id="IdBrand"]');
            let version = page2.locator('//*[@id="IdVersion"]');
            let bodyType = page2.locator('//*[@id="IdBodyType"]');
            let model = page2.locator('//*[@id="IdModel"]');
            let fuel = page2.locator('//*[@id="IdFuel"]');
            let transmission = page2.locator('//*[@id="IdTransmission"]');
            let hp = page2.locator('//*[@id="HP"]');
            let cc = page2.locator('//*[@id="CC"]');
            let doors = page2.locator('//*[@id="Doors"]');
            let seats = page2.locator('//*[@id="Seats"]');
            let color = page2.locator('//*[@id="IdColor"]');
            let productionYear = page2.locator('//*[@id="ProductionYear"]');
            let plateDate = page2.locator('//*[@id="PlateDate"]');
            buttonContinue = page2.locator('//*[@id="vehicleInfo"]/div[3]/div/a[2]');


            await matriculaE.fill(left);
            await matriculaM.fill(middle);
            await matriculaR.fill(right);
            let brandValue = config.tests[2].brand;
            await brand.selectOption({ value: brandValue.toString() });
            let modelValue = config.tests[2].model;
            await model.selectOption({ value: modelValue.toString() });
            let versionValue = config.tests[2].version;
            await version.selectOption({ value: versionValue.toString() });
            let bodyValue = config.tests[2].bodyType;
            await bodyType.selectOption({ value: bodyValue.toString() });
            let fuelValue = config.tests[2].fuel;
            await fuel.selectOption({ value: fuelValue.toString() });
            let transmissionValue = config.tests[2].transmission;
            await transmission.selectOption({ value: transmissionValue.toString() });
            await hp.fill(config.tests[2].hp.toString());
            await cc.fill(config.tests[2].cc.toString());
            await doors.fill(config.tests[2].doors.toString());
            await seats.fill(config.tests[2].seats.toString());
            let colorValue = config.tests[2].color;
            await color.selectOption({ value: colorValue.toString() });
            await productionYear.fill(config.tests[2].productionYear.toString());
            await plateDate.fill(config.tests[2].plateDate);

            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            let kms = page2.locator('//*[@id="Kms"]');
            let price = page2.locator('//*[@id="Price"]');
            let description = page2.locator('//*[@id="Description"]');

            await kms.fill(config.tests[2].kms.toString());
            await price.fill(config.tests[2].price.toString());
            await description.fill(config.tests[2].description.toString());

            buttonContinue = page2.locator('//*[@id="outros"]/div/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="fotos"]/div[2]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="dados"]/div/div[3]/a[2]');
            await buttonContinue.click();

            buttonContinue = page2.locator('//*[@id="confirmChangesModal"]/div/div/div[3]/button[2]');
            await buttonContinue.click();

            await page2.waitForTimeout(2000);

            const vehicleName = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/h2[1]');
            kms = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[1]');
            productionYear = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[2]');
            const matricula = page2.locator('//*[@id="vehicles-catalog"]/section/div[3]/div[1]/ul/li[1]/span[3]');

            await expect(vehicleName.textContent()).resolves.toBe('BYD Dolphin')
            await expect(kms.textContent()).resolves.toBe('3.500 Km');
            await expect(productionYear.textContent()).resolves.toBe('2025');
            await expect(matricula.textContent()).resolves.toBe('92-MD-48');

        });
    });

}
