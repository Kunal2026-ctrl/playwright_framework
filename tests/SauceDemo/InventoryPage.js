import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.productList = page.locator('.inventory_list');
        this.productItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    }

    async getProductCount() {
        return await this.productItems.count();
    }

    async getProductNames() {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    async getProductPrices() {
        return await this.page.locator('.inventory_item_price').allTextContents();
    }

    async addProductToCartByName(productName) {
        const slug = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`#add-to-cart-${slug}`).click();
    }

    async removeProductFromCartByName(productName) {
        const slug = productName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`#remove-${slug}`).click();
    }

    async addProductToCartByIndex(index) {
        await this.productItems.nth(index).locator('button.btn_inventory').click();
    }

    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }

    async getCartCount() {
        if (await this.cartBadge.isVisible()) {
            return await this.cartBadge.textContent();
        }
        return '0';
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async openMenu() {
        await this.hamburgerMenu.click();
    }
}
