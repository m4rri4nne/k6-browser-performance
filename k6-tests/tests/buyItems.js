import { check } from 'k6';
import { DashboardPage } from '../pages/DashboardPage.js';
import { browserOptions } from '../utils/k6-options.js';
import {performLogin} from '../libs/auth.js';
import {CheckoutPage} from '../pages/CheckoutPage.js';
import {CheckOutOverview} from '../pages/CheckOutOverview.js';
import {SuccessPage} from '../pages/SuccessPage.js';


export const options = browserOptions;


export default async function () {
    const page = await performLogin('standard_user', 'secret_sauce');
    const dashboardPage = new DashboardPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverview = new CheckOutOverview(page);
    const successPage = new SuccessPage(page);

    await dashboardPage.addCart();
    let count = await dashboardPage.getCartCount();
    check(page, {
        'Items': () => count === '3',
    });

    await checkoutPage.checkOut('John', 'Doe', '12345');
    await checkoutOverview.confirmCheckOut();
    await successPage.getSuccessMessage();

    await page.close();
}
