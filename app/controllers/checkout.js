const axios = require('axios');
// Fiz isso apenas para fins de Sandbox
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const CONFIG_BEXS_PAY = require('../config/bexspay');
const checkoutHeadersDTO = require('../dto/checkoutHeaders');
const checkoutPayloadDTO = require('../dto/checkoutPayload');
const consumerDTO = require('../dto/consumer');

module.exports = (req, res) => {
    const product = req.body;

    const getTokenPayload = {
        "client_id": process.env.BEXS_API_CLIENT_ID,
        "client_secret": process.env.BEXS_API_CLIENT_SECRET,
        "audience": CONFIG_BEXS_PAY.audience,
        "grant_type": CONFIG_BEXS_PAY.grant_type
    };

    axios.post(CONFIG_BEXS_PAY.url.get_token, getTokenPayload, {"headers": {"content-type": "application/json"}}
    ).then((responseToken) => {

        let requestConfig = checkoutHeadersDTO(responseToken.data.token_type, responseToken.data.access_token);
        requestConfig['params'] = {
            from: process.env.EXCHANGE_RATE_FROM,
            to: process.env.EXCHANGE_RATE_TO
        };

        axios.get(CONFIG_BEXS_PAY.url.get_exchange_rate, requestConfig
        ).then((responseExchangeRate) => {

            const rate = responseExchangeRate.data.quotes.find(quote => quote.symbol === process.env.EXCHANGE_RATE_TO).rate;

            const consumer = consumerDTO(
                process.env.CONSUMER_ID,
                process.env.CONSUMER_FULL_NAME,
                process.env.CONSUMER_NATIONAL_ID,
                process.env.CONSUMER_EMAIL,
                process.env.CONSUMER_ADDRESS_COUNTRY,
                process.env.CONSUMER_ADDRESS_CITY,
                process.env.CONSUMER_ADDRESS_REGION,
                process.env.CONSUMER_ADDRESS_FULL_STREET_ADDRESS,
                process.env.CONSUMER_ADDRESS_NUMBER,
                process.env.CONSUMER_ADDRESS_NEIGHBORHOOD,
                process.env.CONSUMER_ADDRESS_ZIP_CODE
            );

            axios.post(
                CONFIG_BEXS_PAY.url.get_checkout,
                checkoutPayloadDTO(product.price, rate, product.description, consumer),
                checkoutHeadersDTO(responseToken.data.token_type, responseToken.data.access_token)
            ).then((responseCheckout) => {
                const size = product.size_checkout || 'full';
                res.render('checkout-' + size,{url_token: responseCheckout.data.redirect_url});
            }).catch((errorCheckout) => {
                console.log("errorCheckout", errorCheckout || "Ocurred a error");
                res.redirect('/');
            });

        }).catch((errorExchangeRate) => {
            console.log("errorExchangeRate", errorExchangeRate.data || "Ocurred a error");
            res.redirect('/');
        });

    }).catch((errorToken) => {
        console.log("errorToken", errorToken.data || "Ocurred a error");
        res.redirect('/');
    });    
}