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
            expect(matricula.textContent()).toBe('10-AA-15')

        });

    });

}