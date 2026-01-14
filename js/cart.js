// Cart State Management
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('essentials_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('essentials_cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(product, size, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: quantity
        });
    }

    saveCart();
    updateCartUI();
    showAddedNotification(product.name);
}

// Remove item from cart
function removeFromCart(id, size) {
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart();
    updateCartUI();
}

// Update item quantity
function updateQuantity(id, size, newQuantity) {
    const item = cart.find(item => item.id === id && item.size === size);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(id, size);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartUI();
        }
    }
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const checkoutBtn = document.getElementById('checkout-btn');

    const itemCount = getCartItemCount();
    const total = getCartTotal();

    // Update cart badge - always show the count
    cartCount.textContent = itemCount;

    // Update subtotal
    cartSubtotal.textContent = `$${total.toFixed(2)}`;

    // Enable/disable checkout button
    checkoutBtn.disabled = itemCount === 0;

    // Render cart items
    if (cart.length === 0) {
        emptyCartMsg.classList.remove('hidden');
        cartItems.innerHTML = '<p id="empty-cart-msg" class="text-center text-brand-400 py-12">Your cart is empty</p>';
    } else {
        emptyCartMsg.classList.add('hidden');
        cartItems.innerHTML = cart.map(item => `
            <div class="flex gap-4 py-4 border-b border-brand-100">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded-lg bg-brand-50">
                <div class="flex-1">
                    <h4 class="font-medium text-brand-900 text-sm">${item.name}</h4>
                    <p class="text-xs text-brand-500 mt-1">Size: ${item.size}</p>
                    <p class="text-sm font-medium text-brand-800 mt-1">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center gap-3 mt-2">
                        <button onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity - 1})" class="w-6 h-6 border border-brand-200 rounded flex items-center justify-center text-brand-600 hover:bg-brand-50 text-xs">-</button>
                        <span class="text-sm text-brand-800">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, '${item.size}', ${item.quantity + 1})" class="w-6 h-6 border border-brand-200 rounded flex items-center justify-center text-brand-600 hover:bg-brand-50 text-xs">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id}, '${item.size}')" class="text-brand-400 hover:text-brand-600 self-start">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `).join('');
    }
}

// Show notification when item added
function showAddedNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-brand-900 text-white px-6 py-4 rounded-lg shadow-lg z-50 slide-in';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-sm font-medium">${productName} added to cart</span>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Update checkout summary
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');

    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutTax.textContent = `$${tax.toFixed(2)}`;
    checkoutTotal.textContent = `$${total.toFixed(2)}`;

    checkoutItems.innerHTML = cart.map(item => `
        <div class="flex gap-3 py-3 border-b border-brand-200 last:border-0">
            <div class="relative">
                <img src="${item.image}" alt="${item.name}" class="w-14 h-16 object-cover rounded bg-white">
                <span class="absolute -top-2 -right-2 w-5 h-5 bg-brand-600 text-white text-xs rounded-full flex items-center justify-center">${item.quantity}</span>
            </div>
            <div class="flex-1">
                <h4 class="text-sm font-medium text-brand-800">${item.name}</h4>
                <p class="text-xs text-brand-500">Size: ${item.size}</p>
            </div>
            <span class="text-sm font-medium text-brand-800">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}
