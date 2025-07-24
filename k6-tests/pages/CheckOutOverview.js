import { check } from 'k6';

export class CheckOutOverview{
    constructor(page){
        this.page = page;
        this.chekoutOverview = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async confirmCheckOut(){
        await this.chekoutOverview.textContent();
        console.log(this.chekoutOverview.textContent());
        await this.page.screenshot({ path: 'screenshot1.png' });
        check(this.page, {
            'CheckoutOverview': () => this.chekoutOverview.textContent() === 'Checkout: Overview',
        })
        await this.finishButton.click();
    }
}