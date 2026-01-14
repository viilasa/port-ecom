// Stripe Checkout Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');

// Initialize Stripe with your secret key
const stripe = Stripe('sk_test_51ShErGKoonI8baPfZgzi5MbVHWGICiqp958Y2mj0ERYTgW8OxmsWeP484VIPUCJhvozPoWvgUjpcGguCe3gDsTC900oSjZvazi');

const PORT = 3000;
const YOUR_DOMAIN = 'http://localhost:3000';

// MIME types for static files
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle Stripe Checkout Session creation
    if (req.method === 'POST' && req.url === '/create-checkout-session') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { items, customerEmail } = JSON.parse(body);

                // Create line items for Stripe Checkout
                const lineItems = items.map(item => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            description: `Size: ${item.size}`,
                            images: [item.image]
                        },
                        unit_amount: Math.round(item.price * 100) // Stripe uses cents
                    },
                    quantity: item.quantity
                }));

                // Create Stripe Checkout Session
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${YOUR_DOMAIN}/index.html`,
                    customer_email: customerEmail || undefined,
                    billing_address_collection: 'required',
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN']
                    },
                    metadata: {
                        order_source: 'essentials_store'
                    }
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ url: session.url, sessionId: session.id }));

            } catch (error) {
                console.error('Stripe Error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }

    // Handle order verification
    if (req.method === 'GET' && req.url.startsWith('/verify-session')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const sessionId = url.searchParams.get('session_id');

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: session.payment_status,
                customerEmail: session.customer_details?.email,
                amountTotal: session.amount_total / 100
            }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }

    // Serve static files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath.split('?')[0]);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🛍️  ESSENTIALS Store Server Running!                       ║
║                                                              ║
║   Local:    http://localhost:${PORT}                          ║
║                                                              ║
║   ✅ Stripe Checkout enabled                                 ║
║   ✅ Ready to accept payments                                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
});
