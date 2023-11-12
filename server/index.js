const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
            price_data: {
                currency: 'cad',
                product_data: {
                    name: 'T-shirt',
                },
                unit_amount: 2000
            },
            quantity: 1
        },
      ],
      mode: 'payment',
      success_url: `https:/customer/checkout/success`,
      cancel_url: `https://customer/checkout/cancel`,
    });
    res.send({url: session.url});
  });

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})