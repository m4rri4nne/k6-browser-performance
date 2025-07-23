import { browser } from 'k6/browser';
import { LoginPage } from '../pages/LoginPage.js';
import { expect } from '../libs/k6chaijs.js';
import { browserOptions } from '../utils/k6-options.js';


export const options = browserOptions;

export default async function () {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    expect(await loginPage.getHomePageMessage()).to.contain('Products');
    await page.close();
}