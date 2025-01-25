import { test }            from '@playwright/test';
import acceptCookies       from './Cookies/cookies.spec';
import registarUtilizador  from './Registo/registo.spec';
import createAdvertisement from './Advertisement/advertisement.spec';
import searchTests         from './PesquisarVeiculo/pesquisarVeiculo.spec';
import loginTests          from './Login/login.spec';
import contactTests        from './ContactarVendedor/contact.spec';
import contactAnswerTests  from './ContactarVendedor/contact_answer.spec';

test.describe(acceptCookies      );
test.describe(searchTests        );
test.describe(registarUtilizador );
test.describe(loginTests         );
test.describe(createAdvertisement);
test.describe(contactTests       );
test.describe(contactAnswerTests );
