import { check } from 'k6';

export class SuccessPage {
    constructor(page){
        this.page = page;
        this.successMessage = page.locator('[data-test="complete-header"]');
        this.fullMessage = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getSuccessMessage(){
        const successMessageText = await this.successMessage.textContent();
        const fullMessageText = await this.fullMessage.textContent();
        check(this.page, {
            'Success short message': () =>  successMessageText === "Thank you for your order!",
            'Success full message': () => fullMessageText === "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
        })
        await this.backHomeButton.click();
    }
}