import {performLogin} from '../libs/auth.js';
import {addItemsToCart} from '../libs/addToCart.js';
import {browserOptions} from '../utils/k6-options.js';
import {checkOut} from '../libs/checkOut.js';


export const options = browserOptions;


export default async function () {
    const page = await performLogin('performance_glitch_user', 'secret_sauce');
    await addItemsToCart(page);
    await checkOut(page);

    await page.close();
}