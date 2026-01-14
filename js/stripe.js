// Stripe Checkout Integration
// This uses Stripe's hosted checkout page for payments

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51ShErGKoonI8baPf0aBGhmqqkMX0uZh9rQea5FVZsUSS4kIaZiTEW1jNwmPtOVDuQSCgi38kK8hctSsA7u3ULiAO00XtN77HE5';

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// Redirect to Stripe Checkout
async function redirectToStripeCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');

    // Show loading state
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = `
        <span class="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
        Redirecting to payment...
    `;

    try {
        // Get cart items
        const cartItems = JSON.parse(localStorage.getItem('essentials_cart') || '[]');

        if (cartItems.length === 0) {
            alert('Your cart is empty');
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Proceed to Checkout';
            return;
        }

        // Create checkout session on server
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Redirect to Stripe Checkout
        if (data.url) {
            window.location.href = data.url;
        } else {
            throw new Error('No checkout URL received');
        }

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error: ' + error.message);

        // Reset button
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Proceed to Checkout';
    }
}

// Empty functions to prevent errors (not needed for Stripe Checkout)
function initializeStripeElements() {
    // Not needed - using Stripe Checkout
}

function handleStripePayment(event) {
    event.preventDefault();
    // Not needed - using Stripe Checkout
}
