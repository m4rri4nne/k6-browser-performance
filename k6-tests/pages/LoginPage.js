export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#user-name');
        this.passwordFiled = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.homePageHeader = page.locator('.title');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameField.type(username);
        await this.passwordFiled.type(password);
        await this.loginButton.click();
    }

    async getHomePageMessage(){
        return this.homePageHeader.textContent();
    }
}