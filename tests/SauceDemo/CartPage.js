import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async getCartItemNames() {
        return await this.page.locator('.cart_item .inventory_item_name').allTextContents();
    }

    async getCartItemPrices() {
        return await this.page.locator('.cart_item .inventory_item_price').allTextContents();
    }

    async removeItemByName(productName) {
        const slug = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="remove-${slug}"]`).click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
