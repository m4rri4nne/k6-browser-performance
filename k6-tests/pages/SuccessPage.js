import { check } from 'k6';

export class SuccessPage {
    constructor(page){
        this.page = page;
        this.successMessage = page.locator('[data-test="complete-header"]');
        this.fullMessage = page.locator('[data-test="complete-message"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getSuccessMessage(){
        await this.successMessage.textContent();
        console.log(this.successMessage.textContent());
        await this.page.screenshot({ path: 'screenshot.png' });
        check(this.page, {
            'Success short message': () => this.successMessage.textContent() === 'Thank you for your order!',
        })
        await this.fullMessage.textContent();
        console.log(this.fullMessage.textContent());
        check(this.page, {
            'Success full message': () => this.fullMessage.textContent() === 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
        })
        await this.backHomeButton.click();
    }
}