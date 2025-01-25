import { test } from '@playwright/test';
import acceptCookies from './Cookies/cookies.spec';
import { searchTests } from './PesquisarVeiculo/pesquisarVeiculo.spec';
import fs from "fs"
//import registarUtilizador from './Registo/registo.spec';
test.describe(acceptCookies);

const cookies = JSON.parse(fs.readFileSync("cookies.json", {encoding: "utf-8"}))
test.describe(() => searchTests(cookies))

//test.describe(registarUtilizador);