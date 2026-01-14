// Main Application Script
document.addEventListener('DOMContentLoaded', function () {
    // Initialize
    loadCart();
    // Use getMixedProducts for a visually varied product grid (alternating categories)
    if (typeof getMixedProducts === 'function') {
        renderProducts(getMixedProducts());
    } else {
        renderProducts(products);
    }
    setupEventListeners();
});

// Render products to grid - ETQ Style with enhanced visuals
function renderProducts(productList) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // Define background colors for variety
    const bgColors = ['#f5f5f5', '#f8f6f4', '#f5f6f5', '#f6f5f8', '#f4f6f8'];

    grid.innerHTML = productList.map((product, index) => {
        const bgColor = bgColors[index % bgColors.length];
        const isNew = index < 4; // First 4 items get "New" badge

        return `
        <a href="product.html?id=${product.id}" class="product-card bg-white cursor-pointer group block transition-all duration-300 hover:shadow-xl" data-category="${product.category}">
            <div class="relative aspect-square flex items-center justify-center p-6 overflow-hidden" style="background-color: ${bgColor}">
                ${isNew ? '<span class="absolute top-3 left-3 bg-brand-900 text-white text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider z-10">New</span>' : ''}
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110"
                     onerror="this.src='Images/thsirt.jpg'">
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <!-- Quick View Button -->
                <button onclick="event.preventDefault(); event.stopPropagation(); openQuickView(${product.id})" 
                        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-2 bg-white text-brand-900 text-xs font-semibold px-5 py-2.5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-brand-900 hover:text-white">
                    Quick View
                </button>
            </div>
            <div class="p-4 bg-white border-t border-gray-100">
                <div class="flex items-start justify-between gap-2">
                    <div>
                        <h3 class="text-sm font-medium text-brand-800 group-hover:text-brand-900 transition-colors line-clamp-1">${product.name}</h3>
                        <p class="text-xs text-brand-500 mt-0.5 capitalize">${product.color || product.subcategory}</p>
                    </div>
                    <p class="text-sm font-semibold text-brand-900 whitespace-nowrap">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        </a>
    `}).join('');
}


// Filter products by category
function filterProducts(category) {
    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category === category);
    renderProducts(filtered);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Category filters (desktop nav)
    document.querySelectorAll('[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;
            filterProducts(filter);

            // Update active state for pills
            document.querySelectorAll('.category-pill').forEach(pill => {
                if (pill.dataset.filter === filter) {
                    pill.classList.remove('bg-brand-100', 'text-brand-700');
                    pill.classList.add('bg-brand-900', 'text-white');
                } else {
                    pill.classList.remove('bg-brand-900', 'text-white');
                    pill.classList.add('bg-brand-100', 'text-brand-700');
                }
            });

            // Close mobile menu
            mobileMenu.classList.add('hidden');
        });
    });

    // Category pills
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterProducts(filter);

            document.querySelectorAll('.category-pill').forEach(p => {
                if (p.dataset.filter === filter) {
                    p.classList.remove('bg-brand-100', 'text-brand-700');
                    p.classList.add('bg-brand-900', 'text-white');
                } else {
                    p.classList.remove('bg-brand-900', 'text-white');
                    p.classList.add('bg-brand-100', 'text-brand-700');
                }
            });
        });
    });

    // Search modal
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        searchInput.value = '';
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        } else {
            renderProducts(products);
        }
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.add('hidden');
            searchInput.value = '';
        }
    });

    // Cart sidebar
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');

    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    function closeCartSidebar() {
        cartSidebar.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Checkout - redirect to Stripe Checkout
    const checkoutBtn = document.getElementById('checkout-btn');

    checkoutBtn.addEventListener('click', () => {
        closeCartSidebar();
        // Redirect to Stripe Checkout
        redirectToStripeCheckout();
    });

    // Order confirmation (for fallback/manual confirmation page)
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            document.getElementById('confirmation-modal').classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    // Quick View Modal
    const quickviewModal = document.getElementById('quickview-modal');
    const closeQuickview = document.getElementById('close-quickview');
    const quickviewOverlay = document.getElementById('quickview-overlay');

    closeQuickview.addEventListener('click', closeQuickviewModal);
    quickviewOverlay.addEventListener('click', closeQuickviewModal);

    function closeQuickviewModal() {
        quickviewModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Quantity controls in quick view
    let currentQuantity = 1;
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyValue = document.getElementById('qty-value');

    qtyMinus.addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            qtyValue.textContent = currentQuantity;
        }
    });

    qtyPlus.addEventListener('click', () => {
        if (currentQuantity < 10) {
            currentQuantity++;
            qtyValue.textContent = currentQuantity;
        }
    });
}

// Current product for quick view
let currentProduct = null;
let selectedSize = null;

// Open quick view modal
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product;
    selectedSize = null;
    document.getElementById('qty-value').textContent = '1';

    // Populate modal
    document.getElementById('quickview-image').src = product.image;
    document.getElementById('quickview-image').alt = product.name;
    document.getElementById('quickview-category').textContent = product.category;
    document.getElementById('quickview-title').textContent = product.name;
    document.getElementById('quickview-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('quickview-desc').textContent = product.description;

    // Render size options
    const sizeOptions = document.getElementById('size-options');
    sizeOptions.innerHTML = product.sizes.map(size => `
        <button type="button" class="size-btn px-4 py-2 border border-brand-200 rounded-lg text-sm font-medium text-brand-700 hover:border-brand-400 transition-colors" data-size="${size}">
            ${size}
        </button>
    `).join('');

    // Size selection handlers
    sizeOptions.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeOptions.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('bg-brand-900', 'text-white', 'border-brand-900');
                b.classList.add('border-brand-200', 'text-brand-700');
            });
            btn.classList.remove('border-brand-200', 'text-brand-700');
            btn.classList.add('bg-brand-900', 'text-white', 'border-brand-900');
            selectedSize = btn.dataset.size;
        });
    });

    // Show modal
    document.getElementById('quickview-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Add to cart button handler
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    if (!currentProduct) return;

    if (!selectedSize) {
        // Flash size selection
        document.getElementById('size-options').classList.add('animate-pulse');
        setTimeout(() => {
            document.getElementById('size-options').classList.remove('animate-pulse');
        }, 500);
        return;
    }

    const quantity = parseInt(document.getElementById('qty-value').textContent);
    addToCart(currentProduct, selectedSize, quantity);

    // Close modal
    document.getElementById('quickview-modal').classList.add('hidden');
    document.body.style.overflow = '';

    // Reset
    currentProduct = null;
    selectedSize = null;
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('search-modal').classList.add('hidden');
        document.getElementById('cart-sidebar').classList.add('hidden');
        document.getElementById('checkout-modal').classList.add('hidden');
        document.getElementById('quickview-modal').classList.add('hidden');
        document.body.style.overflow = '';
    }
});
