/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createStripeCheckout =
functions.https.onCall(async (data, context) => {
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
