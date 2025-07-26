import {CheckoutPage} from "../pages/CheckoutPage.js";
import {SuccessPage} from "../pages/SuccessPage.js";
import {CheckOutOverview} from "../pages/CheckOutOverview.js";

/**
 * Receives the page context and add items to the cart
 * @param {Page} page
 */
export async function checkOut(page) {
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverview = new CheckOutOverview(page);
    const successPage = new SuccessPage(page);


    await checkoutPage.checkOut('John', 'Doe', '12345');
    await checkoutOverview.confirmCheckOut();
    await successPage.getSuccessMessage();
}