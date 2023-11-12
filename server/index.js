const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;

let endpointSecret = "whsec_6a8b4122d1dec63e00747200d6513a7bf0833b331c2fb31240bc51e3db5953b6";

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
            console.log("data", data);
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

let orderData;

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
    if(session.url === 'http://localhost:5173/customer/checkout/success') {
        orderData = req.body.cart;
    }
    res.send({url: session.url});
});

app.get('/order-data', (req, res) => {
    res.send(orderData);
})

app.listen(PORT, () => {
	console.log("Sever is listening on port 4000")
})