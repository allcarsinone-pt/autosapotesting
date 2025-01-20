import { test, expect } from '@playwright/test';
import randomstring from 'randomstring';
import { describe } from 'node:test';
const config = require("../../test-config.json").acceptCookies;
let context;
let page;

export default function acceptCookies() {
    describe('Accept Cookies', () => {
        test('accept cookies', async ({ browser }) => {
            context = await browser.newContext();
            page = await context.newPage();
            await page.goto(config.global);
            await page.waitForTimeout(5000);

            const cookieScreen = page.locator('//*[@id="qc-cmp2-ui"]');
            if (await cookieScreen.isVisible()) {
                const acceptCookies = page.locator('//*[@id="qc-cmp2-ui"]/div[2]/div/button[3]');
                await acceptCookies.click();
            }

            await expect(page).toHaveURL(config.global);
        });
    });
}