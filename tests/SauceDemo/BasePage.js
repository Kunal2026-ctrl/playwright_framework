export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getPageHeader() {
        return await this.page.locator('.title').textContent();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }
}
