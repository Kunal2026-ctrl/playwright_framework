import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        // Step One - Information
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');

        // Step Two - Overview
        this.summaryItems = page.locator('.cart_item');
        this.subtotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');

        // Complete
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async getSubtotal() {
        return await this.subtotalLabel.textContent();
    }

    async getTax() {
        return await this.taxLabel.textContent();
    }

    async getTotal() {
        return await this.totalLabel.textContent();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async getCompleteHeaderText() {
        return await this.completeHeader.textContent();
    }

    async getCompleteMessageText() {
        return await this.completeText.textContent();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    async getCheckoutError() {
        return await this.errorMessage.textContent();
    }
}
