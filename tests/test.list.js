import { test } from '@playwright/test';
import acceptCookies from './Cookies/cookies.spec';
import registarUtilizador from './Registo/registo.spec';

test.describe(acceptCookies);
test.describe(registarUtilizador);