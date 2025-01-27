import { test } from '@playwright/test';
import acceptCookies from './Cookies/cookies.spec';
import registarUtilizador from './Registo/registo.spec';
import createAdvertisement from './Advertisement/advertisement.spec';
import searchTests from './PesquisarVeiculo/pesquisarVeiculo.spec';
import loginTests from './Login/login.spec';
import contactTests from './ContactarVendedor/contact.spec';
import contactAnswerTests from './ContactarVendedor/contact_answer.spec';
import { emails } from '../test-config.json';

const allTests = [
    { name: 'Accept Cookies', fn: acceptCookies },
    { name: 'Register User', fn: registarUtilizador },
    { name: 'Login as Stand User', fn: () => loginTests(emails.stand) },
    { name: 'Create Advertisement', fn: createAdvertisement },
    { name: 'Search Vehicle', fn: searchTests },
    { name: 'Login as Regular User', fn: () => loginTests(emails.user) },
    { name: 'Contact Seller', fn: contactTests },
    { name: 'Contact Seller - Answer', fn: contactAnswerTests },
];

allTests.forEach(({ name, fn }) => {
    test.describe(name, () => {
        try {
            fn();
        } catch (error) {
            test({ name } - Error, async () => {
                console.error("Error running test suite:", { name }, error);
                throw error;
            });
        }
    });
});