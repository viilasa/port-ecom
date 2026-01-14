// Product Database - Embedded directly for local file compatibility
const products = [
    {
        "id": 1,
        "name": "Essential Crew Tee",
        "category": "clothing",
        "subcategory": "tshirts",
        "price": 45,
        "image": "Images/black-tshirt.png",
        "modalImage": "Images/modal long sleeve black shirt.png",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "color": "Black",
        "description": "A timeless crew neck t-shirt crafted from premium organic cotton."
    },
    {
        "id": 2,
        "name": "Relaxed Fit Tee",
        "category": "clothing",
        "subcategory": "tshirts",
        "price": 55,
        "image": "Images/thsirt.jpg",
        "modalImage": null,
        "sizes": ["S", "M", "L", "XL"],
        "color": "White",
        "description": "Oversized fit for a contemporary silhouette."
    },
    {
        "id": 3,
        "name": "Beige Sweatshirt",
        "category": "clothing",
        "subcategory": "sweaters",
        "price": 85,
        "image": "Images/Beigh Sweat shity.png",
        "modalImage": "Images/beige sweat shirt modal.png",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "color": "Beige",
        "description": "Comfortable beige sweatshirt with a relaxed fit."
    },
    {
        "id": 4,
        "name": "Classic Sweatshirt",
        "category": "clothing",
        "subcategory": "sweaters",
        "price": 78,
        "image": "Images/sweat shirt.png",
        "modalImage": "Images/beige sweat shirt modal.png",
        "sizes": ["S", "M", "L", "XL"],
        "color": "Beige",
        "description": "Premium sweatshirt for everyday comfort."
    },
    {
        "id": 5,
        "name": "Long Sleeve Polo",
        "category": "clothing",
        "subcategory": "polos",
        "price": 95,
        "image": "Images/long sleeve polo.png",
        "modalImage": "Images/long sleeve polo modal.png",
        "sizes": ["S", "M", "L", "XL"],
        "color": "Black",
        "description": "Elegant long sleeve polo for a refined look."
    },
    {
        "id": 6,
        "name": "Slim Fit Trousers",
        "category": "clothing",
        "subcategory": "trousers",
        "price": 88,
        "image": "Images/trouser.jpg",
        "modalImage": null,
        "sizes": ["28", "30", "32", "34", "36"],
        "color": "Charcoal",
        "description": "Classic slim-fit trousers in stretch cotton twill."
    },
    {
        "id": 7,
        "name": "Black Trousers",
        "category": "clothing",
        "subcategory": "trousers",
        "price": 95,
        "image": "Images/black-trousers.png",
        "modalImage": null,
        "sizes": ["30", "32", "34", "36"],
        "color": "Black",
        "description": "Elegantly tailored black trousers."
    },
    {
        "id": 8,
        "name": "Black Bomber Jacket",
        "category": "clothing",
        "subcategory": "jackets",
        "price": 245,
        "image": "Images/Polo jacket.png",
        "modalImage": "Images/black jacket modal.png",
        "sizes": ["S", "M", "L", "XL"],
        "color": "Black",
        "description": "Timeless bomber silhouette in water-resistant nylon."
    },
    {
        "id": 9,
        "name": "Black Hoodie",
        "category": "clothing",
        "subcategory": "hoodies",
        "price": 125,
        "image": "Images/black-hoodie.png",
        "modalImage": null,
        "sizes": ["S", "M", "L", "XL"],
        "color": "Black",
        "description": "Premium black hoodie with soft fleece interior."
    },
    {
        "id": 10,
        "name": "Classic Hoodie",
        "category": "clothing",
        "subcategory": "hoodies",
        "price": 115,
        "image": "Images/hoodie.jpg",
        "modalImage": null,
        "sizes": ["S", "M", "L", "XL"],
        "color": "Navy",
        "description": "Luxurious hoodie for everyday wear."
    },
    {
        "id": 11,
        "name": "White Nappa Sneaker",
        "category": "shoes",
        "subcategory": "sneakers",
        "price": 195,
        "image": "Images/white-nappa-sneaker.png",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "White",
        "description": "Clean leather sneakers with minimalist design."
    },
    {
        "id": 12,
        "name": "Premium White Sneaker",
        "category": "shoes",
        "subcategory": "sneakers",
        "price": 185,
        "image": "Images/White nappa.jpg",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "White",
        "description": "Premium nappa leather sneaker."
    },
    {
        "id": 13,
        "name": "Canvas Low-Top",
        "category": "shoes",
        "subcategory": "sneakers",
        "price": 85,
        "image": "Images/Sneaker.jpg",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Black",
        "description": "Classic canvas sneaker with vulcanized rubber sole."
    },
    {
        "id": 14,
        "name": "White Sole Sneaker",
        "category": "shoes",
        "subcategory": "sneakers",
        "price": 165,
        "image": "Images/shoe-white-lines.png",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Black/White",
        "description": "Modern sneaker with contrasting white sole."
    },
    {
        "id": 15,
        "name": "Premium Runner",
        "category": "shoes",
        "subcategory": "sneakers",
        "price": 225,
        "image": "Images/sneaker-white-sole.png",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Black",
        "description": "Running-inspired sneaker with advanced cushioning."
    },
    {
        "id": 16,
        "name": "Black High Top",
        "category": "shoes",
        "subcategory": "hightops",
        "price": 245,
        "image": "Images/black-hightop.png",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Black",
        "description": "Premium black high-top sneaker."
    },
    {
        "id": 17,
        "name": "Brown High Top Boot",
        "category": "shoes",
        "subcategory": "boots",
        "price": 295,
        "image": "Images/brown high top shoe.png",
        "modalImage": "Images/Brown chocolate sude shoes modal.png",
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Brown",
        "description": "Classic brown suede high-top boot."
    },
    {
        "id": 18,
        "name": "Chelsea Boot",
        "category": "shoes",
        "subcategory": "boots",
        "price": 295,
        "image": "Images/high top.jpg",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Brown",
        "description": "Classic Chelsea boot silhouette with elastic side panels."
    },
    {
        "id": 19,
        "name": "Desert Boot",
        "category": "shoes",
        "subcategory": "boots",
        "price": 185,
        "image": "Images/desert-boot.png",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Sand",
        "description": "Iconic desert boot with crepe rubber sole."
    },
    {
        "id": 20,
        "name": "Black Rugged Boot",
        "category": "shoes",
        "subcategory": "boots",
        "price": 275,
        "image": "Images/rugged-black-shoe.png",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Black",
        "description": "Rugged leather boot for all conditions."
    },
    {
        "id": 21,
        "name": "Rugged Brown Shoe",
        "category": "shoes",
        "subcategory": "boots",
        "price": 225,
        "image": "Images/shoe  rugged.jpg",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Brown",
        "description": "Premium rugged shoe for everyday wear."
    },
    {
        "id": 22,
        "name": "Modern Loafer",
        "category": "shoes",
        "subcategory": "loafers",
        "price": 275,
        "image": "Images/loafers.jpg",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Brown",
        "description": "Sleek penny loafer in supple leather."
    },
    {
        "id": 23,
        "name": "Suede Brown Shoe",
        "category": "shoes",
        "subcategory": "loafers",
        "price": 245,
        "image": "Images/brown.jpg",
        "modalImage": null,
        "sizes": ["7", "8", "9", "10", "11", "12"],
        "color": "Brown",
        "description": "Classic suede shoe with premium finish."
    }
];

// Categories configuration
const categories = {
    "clothing": {
        "name": "Menswear",
        "subcategories": ["tshirts", "sweaters", "polos", "trousers", "jackets", "hoodies"]
    },
    "shoes": {
        "name": "Footwear",
        "subcategories": ["sneakers", "hightops", "boots", "loafers"]
    }
};

// Featured and restock product IDs
const featuredProductIds = [11, 17, 16];
const restockProductIds = [13, 1, 22, 15, 9];

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

// Get products by subcategory
function getProductsBySubcategory(subcategory) {
    return products.filter(p => p.subcategory === subcategory);
}

// Get featured products
function getFeaturedProducts() {
    return featuredProductIds.map(id => getProductById(id)).filter(p => p);
}

// Get restock products
function getRestockProducts() {
    return restockProductIds.map(id => getProductById(id)).filter(p => p);
}

// Get menswear products
function getMenswearProducts() {
    return getProductsByCategory('clothing');
}

// Get footwear products
function getFootwearProducts() {
    return getProductsByCategory('shoes');
}

// Shuffle array for randomized display
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get mixed products (alternating categories for visual variety)
function getMixedProducts() {
    const clothing = shuffleArray(getProductsByCategory('clothing'));
    const shoes = shuffleArray(getProductsByCategory('shoes'));
    const mixed = [];
    const maxLen = Math.max(clothing.length, shoes.length);

    for (let i = 0; i < maxLen; i++) {
        if (i < clothing.length) mixed.push(clothing[i]);
        if (i < shoes.length) mixed.push(shoes[i]);
    }

    return mixed;
}

// Render featured products (Complete your Look section)
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');
    if (!container) return;

    const featured = getFeaturedProducts();
    container.innerHTML = featured.map(p => `
        <a href="product.html?id=${p.id}" class="bg-[#f5f5f5] group cursor-pointer block transition-all duration-300 hover:shadow-lg">
            <div class="aspect-square flex items-center justify-center p-8 overflow-hidden relative">
                <img src="${p.image}" 
                    alt="${p.name}"
                    class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onerror="this.src='Images/thsirt.jpg'">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
            </div>
            <div class="p-4 bg-white border-t border-gray-100">
                <h3 class="text-sm font-medium text-brand-800 group-hover:text-brand-900 transition-colors">${p.name}</h3>
                <div class="flex justify-between items-center mt-1">
                    <p class="text-xs text-brand-500">${p.color}</p>
                    <p class="text-sm font-semibold text-brand-900">$${p.price}</p>
                </div>
            </div>
        </a>
    `).join('');
}

// Render restock products with badge
function renderRestockProducts() {
    const container = document.getElementById('restock-products-grid');
    if (!container) return;

    const restocks = getRestockProducts();
    container.innerHTML = restocks.map((p, index) => `
        <a href="product.html?id=${p.id}" class="bg-[#f5f5f5] group cursor-pointer block transition-all duration-300 hover:shadow-lg ${index >= 4 ? 'hidden md:block' : ''}">
            <div class="aspect-square flex items-center justify-center p-4 overflow-hidden relative">
                <span class="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-sm uppercase tracking-wider">Back in Stock</span>
                <img src="${p.image}" 
                    alt="${p.name}"
                    class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onerror="this.src='Images/thsirt.jpg'">
            </div>
            <div class="p-3 bg-white border-t border-gray-100">
                <p class="text-xs text-brand-600 capitalize">${p.subcategory}</p>
                <p class="text-sm font-medium text-brand-800 mt-0.5">$${p.price}</p>
            </div>
        </a>
    `).join('');
}

// Initialize dynamic sections on page load
document.addEventListener('DOMContentLoaded', function () {
    // Render featured products section
    renderFeaturedProducts();

    // Render restock products section
    renderRestockProducts();

    console.log('Products loaded:', products.length, 'items');
});
