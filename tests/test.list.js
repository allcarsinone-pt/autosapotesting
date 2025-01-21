import { test } from '@playwright/test';
import acceptCookies from './Cookies/cookies.spec';
import { searchTests } from './PesquisarVeiculo/pesquisarVeiculo.spec';
//import registarUtilizador from './Registo/registo.spec';
test.describe(acceptCookies);
test.describe(searchTests)

//test.describe(registarUtilizador);