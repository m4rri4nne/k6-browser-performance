import { performLogin } from '../libs/auth.js';
import { browserOptions } from '../utils/k6-options.js';

export const options = browserOptions;

export default async function () {
    const page = await performLogin('standard_user', 'secret_sauce');
    await page.close();
}
