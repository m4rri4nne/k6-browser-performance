export class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.checkInformation = page.locator('[data-test="title"]');
        this.firstName = page.locator('#first-name');
        this.lastName  = page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async goCheckoutPage(){
        await this.cartIcon.click();
        await this.checkoutButton.click();
        return await this.checkInformation.textContent();
    }

    async addInformation(firstName, lastName, zipCode){
        await this.firstName.type(firstName);
        await this.lastName.type(lastName);
        await this.zipCode.type(zipCode);
        await this.continueButton.click();
    }

    async checkOut(firstName, lastName, zipCode){
        await this.goCheckoutPage()
        await this.addInformation(firstName, lastName, zipCode);

    }

}