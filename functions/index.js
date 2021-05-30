const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Hps8SLAex9slWfOMnvvTl2SMBc1yAFXV0Utd6osXmuSJ7PH8PeykDeoMhJQC18LKJNTbvCw51wBX2DYqV8XpwcO004uzzI3cv")

const app = express()

app.use(cors({origin:true}))
app.use(express.json());

app.post('/payment/create', async (request,response) => {
const total = request.query.total;
const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency:"usd",
})

response.status(201).send({
    clientSecret:paymentIntent.client_secret,
})

});

exports.api = functions.https.onRequest(app)
