import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage.js';
import { InventoryPage } from './InventoryPage.js';
import { CartPage } from './CartPage.js';
import { CheckoutPage } from './CheckoutPage.js';

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('SauceDemo - Login Tests', () => {

    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login(VALID_USER, VALID_PASSWORD);
        const inventoryPage = new InventoryPage(page);
        const header = await inventoryPage.getPageHeader();
        expect(header).toBe('Products');
    });

    test('Login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login('invalid_user', 'wrong_password');
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Username and password do not match');
    });

    test('Login with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login('locked_out_user', VALID_PASSWORD);
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Sorry, this user has been locked out');
    });
});

test.describe('SauceDemo - Inventory Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login(VALID_USER, VALID_PASSWORD);
    });

    test('Verify products are displayed', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const productCount = await inventoryPage.getProductCount();
        expect(productCount).toBe(6);
    });

    test('Add product to cart and verify cart count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe('1');
    });

    test('Sort products by price low to high', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortProducts('lohi');
        const prices = await inventoryPage.getProductPrices();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        for (let i = 0; i < numericPrices.length - 1; i++) {
            expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
        }
    });
});

test.describe('SauceDemo - End to End Purchase Flow', () => {

    test('Complete a purchase successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Step 1: Login
        await loginPage.goToLoginPage();
        await loginPage.login(VALID_USER, VALID_PASSWORD);

        // Step 2: Add products to cart
        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.addProductToCartByName('Sauce Labs Bike Light');
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe('2');

        // Step 3: Go to cart and verify items
        await inventoryPage.goToCart();
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(2);

        // Step 4: Proceed to checkout
        await cartPage.proceedToCheckout();

        // Step 5: Fill checkout info
        await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
        await checkoutPage.clickContinue();

        // Step 6: Verify overview and finish
        const total = await checkoutPage.getTotal();
        expect(total).toContain('Total:');
        await checkoutPage.clickFinish();

        // Step 7: Verify order completion
        const successMessage = await checkoutPage.getCompleteHeaderText();
        expect(successMessage).toBe('Thank you for your order!');
    });
});
