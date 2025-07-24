import { browser } from 'k6/browser';
import { check } from 'k6';
import { LoginPage } from '../pages/LoginPage.js';

/**
 * Do the login and return the page authenticated.
 * @param {string} username
 * @param {string} password
 * @param {string} url
 * @returns {Promise<Page>}
 */
export async function performLogin(username, password, url = 'https://www.saucedemo.com/') {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto(url);
    await loginPage.login(username, password);

    const loginMessage = await loginPage.getHomePageMessage();
    check(page, {
        'Login done with success': () => loginMessage === 'Products',
    });

    return page;
}
