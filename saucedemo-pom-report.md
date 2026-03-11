# Saucedemo Page Object Model - Detailed Report

**Base URL:** https://www.saucedemo.com/  
**Exploration Date:** 2026-03-06T18:56:33.120Z

---

## Page 1: Login Page

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/ |
| **Path** | `/` |
| **Screenshot** | 01-login-page.png |

### Element Selectors

| Element | Selector | ID | Class | data-test |
|---------|----------|-----|-------|-----------|
| Username input | `#user-name` | user-name | - | - |
| Password input | `#password` | password | - | - |
| Login button | `#login-button` | login-button | - | - |
| Error message | `[data-test="error"]` | - | error-message-container | error |

### Key Interactive Elements
- `#user-name` - Username input
- `#password` - Password input  
- `#login-button` - Login button
- `[data-test="error"]` - Error message (visible on failed login)

---

## Page 2: Inventory / Products Page

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/inventory.html |
| **Path** | `/inventory.html` |
| **Screenshot** | 02-inventory-page.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Product list container | `.inventory_list` | Wraps all product cards |
| Product card | `.inventory_item` | Individual product |
| Product name | `.inventory_item_name` | Product title |
| Product price | `.inventory_item_price` | Price text |
| Product description | `.inventory_item_desc` | Description text |
| Product image | `.inventory_item_img img` | Product image |
| Add to cart button | `button.btn_inventory` | Or `#add-to-cart-{product-name}` |
| Sort dropdown | `.product_sort_container` | `data-test="product_sort_container"` |
| Cart icon/link | `.shopping_cart_link` | `data-test="shopping-cart-link"` |
| Cart badge | `.shopping_cart_badge` | Item count |
| Hamburger menu | `#react-burger-menu-btn` | `data-test="react-burger-menu-btn"` |
| Page title | `.title` | "Products" |

### Key Interactive Elements
- `button.btn_inventory` - Add to cart (use nth or product-specific ID)
- `.product_sort_container` - Sort dropdown (Name A-Z, Name Z-A, Price low-high, Price high-low)
- `.shopping_cart_link` - Navigate to cart

---

## Page 3: Cart Page

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/cart.html |
| **Path** | `/cart.html` |
| **Screenshot** | 03-cart-page.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Cart list | `.cart_list` | Container for cart items |
| Cart item | `.cart_item` | Individual cart item |
| Item quantity | `.cart_quantity` | Quantity value |
| Item name | `.inventory_item_name` | Product name in cart |
| Item price | `.inventory_item_price` | Price in cart |
| Remove button | `button.cart_button` | `data-test="remove-{product-name}"` |
| Continue Shopping | `#continue-shopping` | `data-test="continue-shopping"` |
| Checkout | `#checkout` | `data-test="checkout"` |
| Page title | `.title` | "Your Cart" |

### Key Interactive Elements
- `#continue-shopping` - Return to inventory
- `#checkout` - Proceed to checkout
- `button.cart_button` - Remove item from cart

---

## Page 4: Checkout Step One (Information)

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/checkout-step-one.html |
| **Path** | `/checkout-step-one.html` |
| **Screenshot** | 04-checkout-step-one.png |

### Element Selectors

| Element | Selector | data-test |
|---------|----------|-----------|
| First name input | `#first-name` | firstName |
| Last name input | `#last-name` | lastName |
| Zip/Postal code input | `#postal-code` | postalCode |
| Continue button | `#continue` | continue |
| Cancel button | `#cancel` | cancel |
| Page title | `.title` | "Checkout: Your Information" |

### Key Interactive Elements
- `#first-name`, `#last-name`, `#postal-code` - Form inputs
- `#continue` - Proceed to overview
- `#cancel` - Return to cart

---

## Page 5: Checkout Step Two (Overview)

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/checkout-step-two.html |
| **Path** | `/checkout-step-two.html` |
| **Screenshot** | 05-checkout-step-two.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Summary items | `.cart_list .cart_item` | Order items |
| Item name | `.inventory_item_name` | - |
| Item price | `.inventory_item_price` | - |
| Subtotal | `.summary_subtotal_label` | "Item total: $X" |
| Tax | `.summary_tax_label` | "Tax: $X" |
| Total | `.summary_total_label` | "Total: $X" |
| Finish button | `#finish` | `data-test="finish"` |
| Cancel button | `#cancel` | `data-test="cancel"` |
| Page title | `.title` | "Checkout: Overview" |

### Key Interactive Elements
- `#finish` - Complete order
- `#cancel` - Return to inventory

---

## Page 6: Checkout Complete

| Property | Value |
|----------|-------|
| **URL** | https://www.saucedemo.com/checkout-complete.html |
| **Path** | `/checkout-complete.html` |
| **Screenshot** | 06-completion-page.png |

### Element Selectors

| Element | Selector | Notes |
|---------|----------|-------|
| Success header | `.complete-header` | "Thank you for your order!" |
| Success message | `.complete-text` | "Your order has been dispatched..." |
| Back Home button | `#back-to-products` | `data-test="back-to-products"` |
| Page title | `.title` | "Checkout: Complete!" |

### Key Interactive Elements
- `#back-to-products` - Return to inventory

---

## Product-Specific Selectors (Add to Cart / Remove)

Product buttons use kebab-case slugs. Pattern: `add-to-cart-{slug}` or `remove-{slug}`

| Product | Add to Cart ID | Remove data-test |
|---------|----------------|------------------|
| Sauce Labs Backpack | `#add-to-cart-sauce-labs-backpack` | `[data-test="remove-sauce-labs-backpack"]` |
| Sauce Labs Bike Light | `#add-to-cart-sauce-labs-bike-light` | `[data-test="remove-sauce-labs-bike-light"]` |
| Sauce Labs Bolt T-Shirt | `#add-to-cart-sauce-labs-bolt-t-shirt` | `[data-test="remove-sauce-labs-bolt-t-shirt"]` |
| Sauce Labs Fleece Jacket | `#add-to-cart-sauce-labs-fleece-jacket` | `[data-test="remove-sauce-labs-fleece-jacket"]` |
| Sauce Labs Onesie | `#add-to-cart-sauce-labs-onesie` | `[data-test="remove-sauce-labs-onesie"]` |
| Test.allTheThings() T-Shirt (Red) | Use `button.btn_inventory` with nth index | Same pattern as above |

---

## data-test Attributes Summary

| Page | Element | data-test |
|------|---------|-----------|
| Login | Error | `error` |
| Inventory | Sort | `product_sort_container` |
| Inventory | Cart link | `shopping-cart-link` |
| Inventory | Menu | `react-burger-menu-btn` |
| Cart | Continue Shopping | `continue-shopping` |
| Cart | Checkout | `checkout` |
| Checkout 1 | First name | `firstName` |
| Checkout 1 | Last name | `lastName` |
| Checkout 1 | Postal code | `postalCode` |
| Checkout 1 | Continue | `continue` |
| Checkout 1 | Cancel | `cancel` |
| Checkout 2 | Finish | `finish` |
| Checkout 2 | Cancel | `cancel` |
| Complete | Back Home | `back-to-products` |

---

## Screenshots

All saved to: `C:\Users\kunal1\Desktop\PlayWright\PlayWright_Practice1\saucedemo-exploration-screenshots`

1. **01-login-page.png** - Login page
2. **02-inventory-page.png** - Products after login
3. **03-cart-page.png** - Cart with 2 items
4. **04-checkout-step-one.png** - Checkout information form
5. **05-checkout-step-two.png** - Order overview
6. **06-completion-page.png** - Order complete
