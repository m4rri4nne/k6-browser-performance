import { check } from 'k6';

export class CheckOutOverview{
    constructor(page){
        this.page = page;
        this.chekoutOverview = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async confirmCheckOut(){
        const checkOutOverviewTitle = await this.chekoutOverview.textContent();
        check(this.page, {
            'CheckoutOverview': () => checkOutOverviewTitle === "Checkout: Overview",
        })
        await this.finishButton.click();
    }
}