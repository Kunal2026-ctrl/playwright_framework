import { Page } from '@playwright/test'

export class BasePage {
  constructor(page) {
    this.page = page; // store the Playwright page instance
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }
}