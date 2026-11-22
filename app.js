/**
 * Lab 12 - NexusMart Shared Application Logic
 * Centralized XML Loader, Cart Management, Auth State, and Utilities
 */

// Embedded XML String fallback (ensures 100% operation even when opened directly via file:///)
const EMBEDDED_PRODUCTS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog store="Nexus Electronics" updated="2026-11-22">
    <product id="PROD001" category="Audio" featured="true">
        <name>Apex Wireless Noise-Cancelling Headphones</name>
        <price>8499</price>
        <originalPrice>12999</originalPrice>
        <rating>4.8</rating>
        <reviews>142</reviews>
        <image>https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>Experience studio-grade acoustic depth with active hybrid noise cancellation, 40-hour battery life, and ultra-plush memory foam earcups.</description>
        <stock>In Stock</stock>
        <brand>ApexSound</brand>
        <specs>
            <spec name="Battery Life">Up to 40 Hours</spec>
            <spec name="Connectivity">Bluetooth 5.3 &amp; 3.5mm AUX</spec>
            <spec name="Noise Cancellation">Active Hybrid ANC (35dB)</spec>
            <spec name="Weight">240g</spec>
        </specs>
    </product>
    <product id="PROD002" category="Wearables" featured="true">
        <name>Nova Pulse Fitness Smartwatch</name>
        <price>4999</price>
        <originalPrice>7999</originalPrice>
        <rating>4.7</rating>
        <reviews>98</reviews>
        <image>https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>A premium AMOLED smartwatch featuring 24/7 heart-rate and SpO2 monitoring, built-in GPS, water resistance up to 50 meters, and a 10-day battery.</description>
        <stock>In Stock</stock>
        <brand>NovaTech</brand>
        <specs>
            <spec name="Display">1.43-inch Always-on AMOLED</spec>
            <spec name="Battery Life">10 Days Typical Usage</spec>
            <spec name="Water Resistance">5 ATM (50m)</spec>
            <spec name="Sensors">Optical HR, SpO2, Accelerometer, GPS</spec>
        </specs>
    </product>
    <product id="PROD003" category="Smartphones" featured="true">
        <name>Titan Pro 5G Smartphone (256GB)</name>
        <price>34999</price>
        <originalPrice>42999</originalPrice>
        <rating>4.9</rating>
        <reviews>210</reviews>
        <image>https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>Ultra-fast flagship performance with Octa-core processor, 120Hz Fluid AMOLED screen, 108MP triple camera setup, and 65W SuperDart charging.</description>
        <stock>In Stock</stock>
        <brand>TitanMobile</brand>
        <specs>
            <spec name="Processor">Octa-Core 3.2GHz</spec>
            <spec name="RAM / Storage">12GB RAM / 256GB UFS 3.1</spec>
            <spec name="Main Camera">108MP + 12MP Ultra-wide + 8MP Telephoto</spec>
            <spec name="Charging">65W Fast Charging (0-100% in 32 min)</spec>
        </specs>
    </product>
    <product id="PROD004" category="Laptops" featured="true">
        <name>ZenithBook Ultra 14-inch Laptop</name>
        <price>62999</price>
        <originalPrice>74999</originalPrice>
        <rating>4.8</rating>
        <reviews>87</reviews>
        <image>https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>Aerospace-grade aluminum unibody ultrabook with a 2.8K 90Hz OLED display, latest generation Core i7 processor, 16GB RAM, and 1TB NVMe SSD.</description>
        <stock>In Stock</stock>
        <brand>Zenith</brand>
        <specs>
            <spec name="Display">14.0-inch 2.8K OLED (2880x1800)</spec>
            <spec name="Processor">Intel Core i7 13th Gen</spec>
            <spec name="Memory">16GB LPDDR5 RAM</spec>
            <spec name="Storage">1TB PCIe 4.0 SSD</spec>
        </specs>
    </product>
    <product id="PROD005" category="Audio" featured="false">
        <name>EchoPods True Wireless Earbuds</name>
        <price>2999</price>
        <originalPrice>4499</originalPrice>
        <rating>4.6</rating>
        <reviews>165</reviews>
        <image>https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>Compact in-ear wireless earbuds with dynamic bass boost, environmental noise cancellation (ENC) for crystal clear calls, and IPX5 sweat protection.</description>
        <stock>In Stock</stock>
        <brand>EchoAudio</brand>
        <specs>
            <spec name="Playtime">30 Hours with Charging Case</spec>
            <spec name="Latency">45ms Ultra-low Game Mode</spec>
            <spec name="Drivers">11mm Titanium Dynamic Drivers</spec>
            <spec name="Water Rating">IPX5 Splash &amp; Sweat Resistant</spec>
        </specs>
    </product>
    <product id="PROD006" category="Accessories" featured="false">
        <name>HyperStrike RGB Mechanical Keyboard</name>
        <price>3799</price>
        <originalPrice>5999</originalPrice>
        <rating>4.7</rating>
        <reviews>74</reviews>
        <image>https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>Tactile clicky mechanical keyboard equipped with customizable RGB per-key backlighting, hot-swappable switches, and detachable braided Type-C cable.</description>
        <stock>In Stock</stock>
        <brand>HyperGaming</brand>
        <specs>
            <spec name="Switch Type">Outemu Hot-Swappable Blue/Red</spec>
            <spec name="Backlight">16.8 Million Colors RGB (18 Modes)</spec>
            <spec name="Keycaps">Double-shot PBT Keycaps</spec>
            <spec name="Layout">Tenkeyless (87 Keys)</spec>
        </specs>
    </product>
    <product id="PROD007" category="Accessories" featured="false">
        <name>PrecisionPro Wireless Ergonomic Mouse</name>
        <price>1999</price>
        <originalPrice>3299</originalPrice>
        <rating>4.5</rating>
        <reviews>59</reviews>
        <image>https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>Comfort-molded wireless mouse with adjustable 4000 DPI sensor, dual Bluetooth + 2.4GHz connectivity, silent clicks, and rechargeable battery.</description>
        <stock>In Stock</stock>
        <brand>Precision</brand>
        <specs>
            <spec name="DPI Range">800 - 4000 DPI On-the-Fly</spec>
            <spec name="Connection">Dual Mode (BT 5.0 + 2.4GHz Dongle)</spec>
            <spec name="Battery">Built-in 500mAh (Up to 60 Days)</spec>
            <spec name="Click Noise">Silent Clicks (90% Reduction)</spec>
        </specs>
    </product>
    <product id="PROD008" category="Audio" featured="false">
        <name>SoundWave Rugged Waterproof Speaker</name>
        <price>3499</price>
        <originalPrice>5499</originalPrice>
        <rating>4.8</rating>
        <reviews>112</reviews>
        <image>https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&amp;auto=format&amp;fit=crop&amp;q=80</image>
        <description>360-degree room-filling acoustic sound with deep bass radiators, IPX7 complete waterproof submergibility, and 16-hour continuous party playback.</description>
        <stock>In Stock</stock>
        <brand>SoundWave</brand>
        <specs>
            <spec name="Output Power">24W RMS Stereo</spec>
            <spec name="Waterproof">IPX7 (Submersible up to 1 meter)</spec>
            <spec name="Battery Life">16 Hours continuous playback</spec>
            <spec name="Special Feature">PartySync Multi-Speaker Pairing</spec>
        </specs>
    </product>
</catalog>`;

/**
 * 1. XML Parser & Loader
 */
async function loadProductsFromXml() {
    try {
        const response = await fetch('products.xml');
        if (response.ok) {
            const xmlText = await response.text();
            return parseXml(xmlText);
        }
    } catch (e) {
        console.warn('Network XML fetch fell back to embedded catalog (CORS/file:// safety)');
    }
    return parseXml(EMBEDDED_PRODUCTS_XML);
}

function parseXml(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const productNodes = xmlDoc.getElementsByTagName('product');
    const products = [];

    for (let i = 0; i < productNodes.length; i++) {
        const node = productNodes[i];
        const getText = (tag) => {
            const el = node.getElementsByTagName(tag)[0];
            return el ? el.textContent.trim() : '';
        };

        const specs = [];
        const specNodes = node.getElementsByTagName('spec');
        for (let j = 0; j < specNodes.length; j++) {
            specs.push({
                name: specNodes[j].getAttribute('name'),
                value: specNodes[j].textContent.trim()
            });
        }

        products.push({
            id: node.getAttribute('id') || `PROD${i + 1}`,
            category: node.getAttribute('category') || 'General',
            featured: node.getAttribute('featured') === 'true',
            name: getText('name'),
            price: Number(getText('price')) || 0,
            originalPrice: Number(getText('originalPrice')) || 0,
            rating: Number(getText('rating')) || 4.5,
            reviews: Number(getText('reviews')) || 10,
            image: getText('image'),
            description: getText('description'),
            stock: getText('stock') || 'In Stock',
            brand: getText('brand') || 'NexusBrand',
            specs: specs
        });
    }

    return products;
}

/**
 * 2. Shopping Cart Management (Persistent in localStorage)
 */
const CART_KEY = 'nexusmart_cart_v1';

function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateNavCartBadge();
}

function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart(cart);
    showToast(`🛒 "${product.name}" added to cart!`);
}

function updateCartQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
    showToast('🗑️ Item removed from cart.');
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateNavCartBadge();
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateNavCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCartCount();
    badges.forEach(b => b.textContent = count);
}

/**
 * 3. Currency Formatter (Indian Rupees ₹)
 */
function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

/**
 * 4. Toast Notifications
 */
function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

/**
 * 5. User Auth State
 */
function getLoggedInUser() {
    const user = localStorage.getItem('nexusmart_user');
    return user ? JSON.parse(user) : null;
}

function setLoggedInUser(user) {
    localStorage.setItem('nexusmart_user', JSON.stringify(user));
    updateNavUser();
}

function logoutUser() {
    localStorage.removeItem('nexusmart_user');
    updateNavUser();
    showToast('Logged out successfully.');
}

function updateNavUser() {
    const user = getLoggedInUser();
    const userBtn = document.getElementById('navUserBtn');
    if (userBtn) {
        if (user) {
            userBtn.innerHTML = `👤 ${user.name.split(' ')[0]}`;
            userBtn.href = 'login.html';
        } else {
            userBtn.innerHTML = `👤 Sign In`;
            userBtn.href = 'login.html';
        }
    }
}

// Global auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavCartBadge();
    updateNavUser();
});
