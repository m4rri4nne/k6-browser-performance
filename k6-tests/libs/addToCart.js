import { check } from 'k6';
import {DashboardPage} from '../pages/DashboardPage.js';

/**
 * Receives the page context and add items to the cart
 * @param {Page} page
 */
export async function addItemsToCart(page) {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addCart();
    let count = await dashboardPage.getCartCount();
    check(page, {
        'Items': () => count === '3',
    });
}