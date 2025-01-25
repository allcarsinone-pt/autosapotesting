import { test, expect } from '@playwright/test'
import { describe } from 'node:test';
import fs from "fs"
const config = require("../../test-config.json").acceptCookies;
let context;
let page;

export default function acceptCookies() {
    describe('Accept Cookies', () => {
        test('accept cookies', async ({ context }) => {

            page = await context.newPage();
            await page.goto(config.global);
            await page.waitForTimeout(5000);

            const cookieScreen = page.locator('//*[@id="qc-cmp2-ui"]');
            if (await cookieScreen.isVisible()) {
                const acceptCookies = page.locator('//*[@id="qc-cmp2-ui"]/div[2]/div/button[3]');
                await acceptCookies.click();
            }

            const cookies = await context.cookies()

            //const jsonCookies = JSON.stringify(cookies, null, 2)

            await context.storageState({ path: 'cookies.json' });

            await expect(page).toHaveURL(config.global);
        });
    });
}