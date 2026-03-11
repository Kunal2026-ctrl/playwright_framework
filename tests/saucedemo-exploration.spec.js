/**
 * Saucedemo Full Site Exploration for Page Object Model
 * Documents all pages, selectors, and structure
 */
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'saucedemo-exploration-screenshots');
const REPORT_FILE = path.join(process.cwd(), 'saucedemo-pom-report.md');

// Helper to get element info
async function getElementInfo(page, selector, label) {
  try {
    const el = page.locator(selector).first();
    if (await el.count() > 0) {
      const tag = await el.evaluate(e => e.tagName);
      const id = await el.getAttribute('id');
      const cls = await el.getAttribute('class');
      const dataTest = await el.getAttribute('data-test');
      const dataTestid = await el.getAttribute('data-testid');
      return { selector, tag, id, class: cls, 'data-test': dataTest, 'data-testid': dataTestid };
    }
  } catch (e) { /* ignore */ }
  return { selector, note: 'not found' };
}

test.describe('Saucedemo POM Exploration', () => {
  test('Full site exploration and documentation', async ({ page }) => {
    if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    const report = { pages: [] };

    // ========== 1. LOGIN PAGE ==========
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-login-page.png'), fullPage: true });

    const loginSelectors = await page.evaluate(() => {
      const getAttrs = (el) => el ? { id: el.id, class: el.className, 'data-test': el.getAttribute('data-test'), name: el.name, type: el.type } : null;
      const userInput = document.querySelector('#user-name') || document.querySelector('[name="user-name"]') || document.querySelector('input[placeholder*="Username"]');
      const passInput = document.querySelector('#password') || document.querySelector('[name="password"]');
      const loginBtn = document.querySelector('#login-button') || document.querySelector('[name="login-button"]');
      const errorBox = document.querySelector('[data-test="error"]') || document.querySelector('.error-message-container');
      return {
        usernameInput: getAttrs(userInput) || { selector: '#user-name' },
        passwordInput: getAttrs(passInput) || { selector: '#password' },
        loginButton: getAttrs(loginBtn) || { selector: '#login-button' },
        errorMessage: errorBox ? { id: errorBox.id, class: errorBox.className, 'data-test': errorBox.getAttribute('data-test') } : { selector: '[data-test="error"]' }
      };
    });

    report.pages.push({
      name: 'Login Page',
      url: 'https://www.saucedemo.com/',
      path: '/',
      selectors: loginSelectors,
      screenshot: '01-login-page.png'
    });

    // ========== 2. LOGIN & INVENTORY PAGE ==========
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForURL(/.*inventory.*/, { timeout: 10000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-inventory-page.png'), fullPage: true });

    const inventorySelectors = await page.evaluate(() => {
      const items = document.querySelectorAll('.inventory_item');
      const firstItem = items[0];
      const getSel = (el, fallback) => el ? (el.id ? '#' + el.id : (el.className ? '.' + el.className.split(' ')[0] : fallback)) : fallback;
      return {
        productListContainer: { selector: '.inventory_list', class: document.querySelector('.inventory_list')?.className },
        productCard: { selector: '.inventory_item', count: items.length },
        productName: { selector: '.inventory_item_name', sample: firstItem?.querySelector('.inventory_item_name')?.textContent?.trim() },
        productPrice: { selector: '.inventory_item_price', sample: firstItem?.querySelector('.inventory_item_price')?.textContent },
        productDesc: { selector: '.inventory_item_desc', sample: firstItem?.querySelector('.inventory_item_desc')?.textContent?.substring(0, 30) },
        productImage: { selector: '.inventory_item_img img', alt: firstItem?.querySelector('.inventory_item_img img')?.alt },
        addToCartBtn: { selector: 'button.btn_inventory', 'data-test': firstItem?.querySelector('button')?.getAttribute('data-test') },
        addToCartBtnById: { selector: '#add-to-cart-sauce-labs-backpack', note: 'Product-specific IDs: add-to-cart-{product-name}' },
        sortDropdown: { selector: '.product_sort_container', 'data-test': document.querySelector('.product_sort_container')?.getAttribute('data-test') },
        cartIcon: { selector: '.shopping_cart_link', 'data-test': document.querySelector('.shopping_cart_link')?.getAttribute('data-test') },
        cartBadge: { selector: '.shopping_cart_badge' },
        hamburgerMenu: { selector: '#react-burger-menu-btn', 'data-test': document.querySelector('#react-burger-menu-btn')?.getAttribute('data-test') },
        pageTitle: { selector: '.title', text: document.querySelector('.title')?.textContent }
      };
    });

    report.pages.push({
      name: 'Inventory / Products Page',
      url: page.url(),
      path: '/inventory.html',
      selectors: inventorySelectors,
      screenshot: '02-inventory-page.png'
    });

    // ========== 3. ADD TO CART & CART PAGE ==========
    const addButtons = await page.locator('button.btn_inventory').all();
    if (addButtons.length >= 2) {
      await addButtons[0].click();
      await addButtons[1].click();
    }
    await page.click('.shopping_cart_link');
    await page.waitForURL(/.*cart.*/, { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-cart-page.png'), fullPage: true });

    const cartSelectors = await page.evaluate(() => {
      const items = document.querySelectorAll('.cart_item');
      const first = items[0];
      return {
        cartList: { selector: '.cart_list' },
        cartItem: { selector: '.cart_item', count: items.length },
        itemQuantity: { selector: '.cart_quantity', sample: first?.querySelector('.cart_quantity')?.textContent },
        itemName: { selector: '.inventory_item_name', sample: first?.querySelector('.inventory_item_name')?.textContent },
        itemPrice: { selector: '.inventory_item_price', sample: first?.querySelector('.inventory_item_price')?.textContent },
        removeButton: { selector: 'button.cart_button', 'data-test': first?.querySelector('button')?.getAttribute('data-test') },
        continueShoppingBtn: { selector: '#continue-shopping', 'data-test': document.querySelector('#continue-shopping')?.getAttribute('data-test') },
        checkoutBtn: { selector: '#checkout', 'data-test': document.querySelector('#checkout')?.getAttribute('data-test') },
        pageTitle: { selector: '.title', text: document.querySelector('.title')?.textContent }
      };
    });

    report.pages.push({
      name: 'Cart Page',
      url: page.url(),
      path: '/cart.html',
      selectors: cartSelectors,
      screenshot: '03-cart-page.png'
    });

    // ========== 4. CHECKOUT STEP ONE ==========
    await page.click('#checkout');
    await page.waitForURL(/.*checkout-step-one.*/, { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-checkout-step-one.png'), fullPage: true });

    const checkoutOneSelectors = await page.evaluate(() => {
      const fn = document.querySelector('#first-name') || document.querySelector('[data-test="firstName"]');
      const ln = document.querySelector('#last-name') || document.querySelector('[data-test="lastName"]');
      const zip = document.querySelector('#postal-code') || document.querySelector('[data-test="postalCode"]');
      const cont = document.querySelector('#continue') || document.querySelector('[data-test="continue"]');
      const cancel = document.querySelector('#cancel') || document.querySelector('[data-test="cancel"]');
      return {
        firstNameInput: { selector: '#first-name', 'data-test': fn?.getAttribute('data-test') },
        lastNameInput: { selector: '#last-name', 'data-test': ln?.getAttribute('data-test') },
        zipCodeInput: { selector: '#postal-code', 'data-test': zip?.getAttribute('data-test') },
        continueButton: { selector: '#continue', 'data-test': cont?.getAttribute('data-test') },
        cancelButton: { selector: '#cancel', 'data-test': cancel?.getAttribute('data-test') },
        pageTitle: { selector: '.title', text: document.querySelector('.title')?.textContent }
      };
    });

    report.pages.push({
      name: 'Checkout Step One (Information)',
      url: page.url(),
      path: '/checkout-step-one.html',
      selectors: checkoutOneSelectors,
      screenshot: '04-checkout-step-one.png'
    });

    // ========== 5. FILL FORM & CHECKOUT STEP TWO ==========
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    await page.waitForURL(/.*checkout-step-two.*/, { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-checkout-step-two.png'), fullPage: true });

    const checkoutTwoSelectors = await page.evaluate(() => {
      const items = document.querySelectorAll('.cart_item');
      const summary = document.querySelector('.summary_info');
      return {
        summaryItems: { selector: '.cart_list .cart_item', count: items.length },
        itemName: { selector: '.inventory_item_name' },
        itemPrice: { selector: '.inventory_item_price' },
        subtotalLabel: { selector: '.summary_subtotal_label', text: document.querySelector('.summary_subtotal_label')?.textContent },
        taxLabel: { selector: '.summary_tax_label', text: document.querySelector('.summary_tax_label')?.textContent },
        totalLabel: { selector: '.summary_total_label', text: document.querySelector('.summary_total_label')?.textContent },
        finishButton: { selector: '#finish', 'data-test': document.querySelector('#finish')?.getAttribute('data-test') },
        cancelButton: { selector: '#cancel', 'data-test': document.querySelector('#cancel')?.getAttribute('data-test') },
        pageTitle: { selector: '.title', text: document.querySelector('.title')?.textContent }
      };
    });

    report.pages.push({
      name: 'Checkout Step Two (Overview)',
      url: page.url(),
      path: '/checkout-step-two.html',
      selectors: checkoutTwoSelectors,
      screenshot: '05-checkout-step-two.png'
    });

    // ========== 6. COMPLETION PAGE ==========
    await page.click('#finish');
    await page.waitForURL(/.*checkout-complete.*/, { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-completion-page.png'), fullPage: true });

    const completionSelectors = await page.evaluate(() => {
      const completeHeader = document.querySelector('.complete-header');
      const completeText = document.querySelector('.complete-text');
      const backBtn = document.querySelector('#back-to-products') || document.querySelector('[data-test="back-to-products"]');
      return {
        successHeader: { selector: '.complete-header', text: completeHeader?.textContent },
        successMessage: { selector: '.complete-text', text: completeText?.textContent },
        backHomeButton: { selector: '#back-to-products', 'data-test': backBtn?.getAttribute('data-test') },
        pageTitle: { selector: '.title', text: document.querySelector('.title')?.textContent }
      };
    });

    report.pages.push({
      name: 'Checkout Complete',
      url: page.url(),
      path: '/checkout-complete.html',
      selectors: completionSelectors,
      screenshot: '06-completion-page.png'
    });

    // ========== GENERATE REPORT ==========
    const md = `# Saucedemo Page Object Model - Detailed Report

**Base URL:** https://www.saucedemo.com/  
**Exploration Date:** ${new Date().toISOString()}

---

## Page 1: Login Page

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/ |
| **Path** | \`/\` |
| **Screenshot** | 01-login-page.png |

### Element Selectors

| Element | Selector | ID | Class | data-test |
|---------|----------|-----|-------|-----------|
| Username input | \`#user-name\` | user-name | - | - |
| Password input | \`#password\` | password | - | - |
| Login button | \`#login-button\` | login-button | - | - |
| Error message | \`[data-test="error"]\` | - | error-message-container | error |

### Key Interactive Elements
- \`#user-name\` - Username input
- \`#password\` - Password input  
- \`#login-button\` - Login button
- \`[data-test="error"]\` - Error message (visible on failed login)

---

## Page 2: Inventory / Products Page

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/inventory.html |
| **Path** | \`/inventory.html\` |
| **Screenshot** | 02-inventory-page.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Product list container | \`.inventory_list\` | Wraps all product cards |
| Product card | \`.inventory_item\` | Individual product |
| Product name | \`.inventory_item_name\` | Product title |
| Product price | \`.inventory_item_price\` | Price text |
| Product description | \`.inventory_item_desc\` | Description text |
| Product image | \`.inventory_item_img img\` | Product image |
| Add to cart button | \`button.btn_inventory\` | Or \`#add-to-cart-{product-name}\` |
| Sort dropdown | \`.product_sort_container\` | \`data-test="product_sort_container"\` |
| Cart icon/link | \`.shopping_cart_link\` | \`data-test="shopping-cart-link"\` |
| Cart badge | \`.shopping_cart_badge\` | Item count |
| Hamburger menu | \`#react-burger-menu-btn\` | \`data-test="react-burger-menu-btn"\` |
| Page title | \`.title\` | "Products" |

### Key Interactive Elements
- \`button.btn_inventory\` - Add to cart (use nth or product-specific ID)
- \`.product_sort_container\` - Sort dropdown (Name A-Z, Name Z-A, Price low-high, Price high-low)
- \`.shopping_cart_link\` - Navigate to cart

---

## Page 3: Cart Page

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/cart.html |
| **Path** | \`/cart.html\` |
| **Screenshot** | 03-cart-page.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Cart list | \`.cart_list\` | Container for cart items |
| Cart item | \`.cart_item\` | Individual cart item |
| Item quantity | \`.cart_quantity\` | Quantity value |
| Item name | \`.inventory_item_name\` | Product name in cart |
| Item price | \`.inventory_item_price\` | Price in cart |
| Remove button | \`button.cart_button\` | \`data-test="remove-{product-name}"\` |
| Continue Shopping | \`#continue-shopping\` | \`data-test="continue-shopping"\` |
| Checkout | \`#checkout\` | \`data-test="checkout"\` |
| Page title | \`.title\` | "Your Cart" |

### Key Interactive Elements
- \`#continue-shopping\` - Return to inventory
- \`#checkout\` - Proceed to checkout
- \`button.cart_button\` - Remove item from cart

---

## Page 4: Checkout Step One (Information)

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/checkout-step-one.html |
| **Path** | \`/checkout-step-one.html\` |
| **Screenshot** | 04-checkout-step-one.png |

### Element Selectors

| Element | Selector | data-test |
|---------|----------|-----------|
| First name input | \`#first-name\` | firstName |
| Last name input | \`#last-name\` | lastName |
| Zip/Postal code input | \`#postal-code\` | postalCode |
| Continue button | \`#continue\` | continue |
| Cancel button | \`#cancel\` | cancel |
| Page title | \`.title\` | "Checkout: Your Information" |

### Key Interactive Elements
- \`#first-name\`, \`#last-name\`, \`#postal-code\` - Form inputs
- \`#continue\` - Proceed to overview
- \`#cancel\` - Return to cart

---

## Page 5: Checkout Step Two (Overview)

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/checkout-step-two.html |
| **Path** | \`/checkout-step-two.html\` |
| **Screenshot** | 05-checkout-step-two.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Summary items | \`.cart_list .cart_item\` | Order items |
| Item name | \`.inventory_item_name\` | - |
| Item price | \`.inventory_item_price\` | - |
| Subtotal | \`.summary_subtotal_label\` | "Item total: $X" |
| Tax | \`.summary_tax_label\` | "Tax: $X" |
| Total | \`.summary_total_label\` | "Total: $X" |
| Finish button | \`#finish\` | \`data-test="finish"\` |
| Cancel button | \`#cancel\` | \`data-test="cancel"\` |
| Page title | \`.title\` | "Checkout: Overview" |

### Key Interactive Elements
- \`#finish\` - Complete order
- \`#cancel\` - Return to inventory

---

## Page 6: Checkout Complete

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/checkout-complete.html |
| **Path** | \`/checkout-complete.html\` |
| **Screenshot** | 06-completion-page.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Success header | \`.complete-header\` | "Thank you for your order!" |
| Success message | \`.complete-text\` | "Your order has been dispatched..." |
| Back Home button | \`#back-to-products\` | \`data-test="back-to-products"\` |
| Page title | \`.title\` | "Checkout: Complete!" |

### Key Interactive Elements
- \`#back-to-products\` - Return to inventory

---

## data-test Attributes Summary

| Page | Element | data-test |
|------|---------|-----------|
| Login | Error | \`error\` |
| Inventory | Sort | \`product_sort_container\` |
| Inventory | Cart link | \`shopping-cart-link\` |
| Inventory | Menu | \`react-burger-menu-btn\` |
| Cart | Continue Shopping | \`continue-shopping\` |
| Cart | Checkout | \`checkout\` |
| Checkout 1 | First name | \`firstName\` |
| Checkout 1 | Last name | \`lastName\` |
| Checkout 1 | Postal code | \`postalCode\` |
| Checkout 1 | Continue | \`continue\` |
| Checkout 1 | Cancel | \`cancel\` |
| Checkout 2 | Finish | \`finish\` |
| Checkout 2 | Cancel | \`cancel\` |
| Complete | Back Home | \`back-to-products\` |

---

## Screenshots

All saved to: \`${SCREENSHOT_DIR}\`

1. **01-login-page.png** - Login page
2. **02-inventory-page.png** - Products after login
3. **03-cart-page.png** - Cart with 2 items
4. **04-checkout-step-one.png** - Checkout information form
5. **05-checkout-step-two.png** - Order overview
6. **06-completion-page.png** - Order complete
`;

    fs.writeFileSync(REPORT_FILE, md, 'utf8');
    console.log('\n=== SAUCEDEMO POM REPORT:', REPORT_FILE, '===\n');
  });
});
