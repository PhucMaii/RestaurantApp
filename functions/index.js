/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const lineItems = data.lineItems;
    const successUrl = data.successUrl;
    const cancelUrl = data.cancelUrl;
    const uid = data.uid;
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: lineItems,
            client_reference_id: uid,
        });
        return {id: session.id, url: session.url};
    } catch (error) {
        return {error: error.message};
    }
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    let event;
    try {
        const whSec = functions.config().stripe.payments_webhook_secret;
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            req.headers["stripe-signature"],
            whSec,
        );
    } catch (error) {
        console.error(
            error,
            "Webhook signature verification failed.",
            req.rawBody,
            req.headers["stripe-signature"],
        );
        return res.sendStatus(400);
    }
    const dataObject = event.data.object;
    if (dataObject.payment_status === "paid") {
        const uid = dataObject.client_reference_id;
        const customerRef = admin.firestore().collection("customers").doc(uid);
        const customerDoc = await customerRef.get();
        if (customerDoc.exists) {
            const data = customerDoc.data();
            const cartData = data.cart;
            // Create order
            cartData.forEach(async (restaurant) => {
                await admin
                    .firestore()
                    .collection("orders")
                    .set({
                        customerName: data.name,
                        customerEmail: data.email,
                        customerPhoneNumber: data.phoneNumber || "",
                        restaurantId: restaurant.restaurantInfo.restaurantId,
                        items: restaurant.items,
                        note: restaurant.note || "",
                        orderStatus: "Hold",
                        orderTime: admin.firestore.FieldValue.serverTimestamp(),
                    });
            });
            // Reset Cart
            const reset = customerRef.update({cart: []});
            if (reset.writeTime) {
                console.log("Customer Updated Successfully");
            } else {
                console.log("Failed To Update Customer");
            }
        } else {
            console.error("Users Does Not Exists");
        }
    }
});
