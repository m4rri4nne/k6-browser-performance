export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.addCartBackPack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addCartboltTShirt = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.addCartonesieRip = page.locator('#add-to-cart-sauce-labs-onesie');
        this.cartIcon = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addCart(){
        await this.addCartBackPack.click();
        await this.addCartboltTShirt.click();
        await this.addCartonesieRip.click();
    }

    async getCartCount(){
        await this.cartIcon.isVisible();
        return await this.cartIcon.textContent();
    }

}