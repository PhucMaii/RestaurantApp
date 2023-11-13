const express = require("express");
const app = express();
const http = require('http');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;

let endpointSecret = "whsec_6a8b4122d1dec63e00747200d6513a7bf0833b331c2fb31240bc51e3db5953b6";
const connectedClients = new Set();

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;

    if(endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("Webhook verified");
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }
    //Handle Event
    if(eventType === "checkout.session.completed") {
        console.log(data, "DATA");
        stripe.customers.retrieve(data.customer).then((customer) => {
            console.log(customer);
            if(data.payment_status === "paid") {
                console.log("Customer paid successfully");
                sendToConnectedClient("Customer paid successfully");
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Add the client to the set of connected clients
    connectedClients.add(res);

    // Send a welcome message or any initial data to the client
    res.write('data: Successful');

    // Remove the client from the set when the connection is closed
    req.on('close', () => {
        connectedClients.delete(res);
    });
});

app.post('/create-checkout-session', async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: JSON.stringify(req.body.cart)
        }
    })
    const line_items = req.body.cart.map((item) => {
        let description = '';
        if(item.options) {
            for(let option of item.options) {
                description += `${option.name}, `
            }
        }
        return {
            price_data: {
                currency: 'cad',
                product_data: {
                    name: item.name,
                    description: description ? description : "No Options"   
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }
    });
    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items,
        mode: 'payment',
        success_url: `http://localhost:5173/customer/checkout/success`,
        cancel_url: `http://localhost:5173/customer/checkout`,
    });
    console.log(session, "Session URL");
    res.send({url: session.url});
});

function sendToConnectedClient(data) {
    for (const client of connectedClients) {
        client.write(`data: ${data}\n\n`);
    }
}

app.listen(PORT, () => {
	console.log("Sever is listening on port 4000")
})