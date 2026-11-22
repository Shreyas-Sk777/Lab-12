# Lab 12 - Online Shopping Website (HTML, CSS, JavaScript & XML)

A modern, responsive e-commerce shopping website built with **HTML5, CSS3, JavaScript, and XML**.

---

## Required Pages Implemented

| Page Name | File | Description |
| :--- | :--- | :--- |
| **Home page** | [`index.html`](index.html) | Hero banner, value propositions, and featured items loaded from XML. |
| **Products page** | [`products.html`](products.html) | **Loaded dynamically from `products.xml`** using JavaScript. Supports category filtering, live instant search, and price sorting. |
| **Product details page** | [`product-details.html`](product-details.html) | Detailed product specs table parsed from XML, gallery view, quantity picker, and Add-to-Cart. |
| **Shopping cart page** | [`cart.html`](cart.html) | Persistent cart table using `localStorage`, quantity increment/decrement, coupon discounts (`LAB12`), and tax breakdown. |
| **Checkout page** | [`checkout.html`](checkout.html) | Customer info, shipping address, payment methods (UPI, Card, Net Banking, COD), order summary, and order confirmation receipt. |
| **Login / Register page** | [`login.html`](login.html) | Tabbed authentication interface with session management and user profile state. |
| **Contact page** | [`contact.html`](contact.html) | Store contact information cards, interactive inquiry form with validation, and status indicators. |
| **XML Catalog** | [`products.xml`](products.xml) | Well-formed XML file with products, specifications, images, pricing, and stock levels. |

---

## Key Features

1. **XML Data Integration (`products.xml` & `app.js`)**:
   - Uses `fetch()` and `DOMParser` to extract product nodes, categories, technical specifications, and image URLs.
   - Includes embedded fallback to ensure 100% operation even when double-clicked locally (`file:///`).
2. **Persistent Cart (`localStorage`)**:
   - Items added from Home, Catalog, or Details pages remain in cart across page reloads and transitions.
   - Cart badge in the navigation bar updates in real time.
3. **Responsive Design (`style.css`)**:
   - Clean, modern layout matching high-end consumer tech platforms.
4. **Deployable to GitHub Pages**:
   - Fully static client-side web application — works out of the box on GitHub Pages!

---

## How to Run

1. Open [`index.html`](index.html) directly in any modern web browser (Chrome, Edge, Firefox).
2. Or run via a local static web server:
   ```powershell
   cd "d:\Web Programming Labs\Lab 12"
   python -m http.server 8000
   ```
   Then visit [http://localhost:8000](http://localhost:8000).
