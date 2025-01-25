import { test } from '@playwright/test';
import acceptCookies from './Cookies/cookies.spec';
import registarUtilizador from './Registo/registo.spec';
import createAdvertisement from './Advertisement/advertisement.spec';

//test.describe(acceptCookies);
test.describe(createAdvertisement);