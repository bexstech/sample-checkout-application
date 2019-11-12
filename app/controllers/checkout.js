const axios = require('axios');
// Fiz isso apenas para fins de Sandbox
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const CONFIG_BEXS_PAY = require('../config/bexspay');
const CONSUMER_DATA   = require('../config/consumer');
const EXCHANGE_RATE   = require('../config/exchange');

const checkoutHeadersDomain = require('../domains/checkoutHeaders');
const checkoutPayloadDTO = require('../domains/checkoutPayload');
const consumerDomain        = require('../domains/consumer');

module.exports = (req, res) => {
    const product = req.body;

    const getTokenPayload = {
        "client_id": process.env.BEXS_API_CLIENT_ID,
        "client_secret": process.env.BEXS_API_CLIENT_SECRET,
        "audience": CONFIG_BEXS_PAY.audience,
        "grant_type": CONFIG_BEXS_PAY.grant_type
    };

    axios.post(
        CONFIG_BEXS_PAY.url.get_token,
        getTokenPayload,
        {"headers": {"content-type": "application/json"}}
    ).then((responseToken) => {

        let requestConfig = checkoutHeadersDomain(responseToken.data.token_type, responseToken.data.access_token);
        requestConfig['params'] = {
            from: EXCHANGE_RATE.from,
            to: EXCHANGE_RATE.to
        };

        axios.get(CONFIG_BEXS_PAY.url.get_exchange_rate, requestConfig
        ).then((responseExchangeRate) => {

            const rate = responseExchangeRate.data.quotes.find(quote => quote.symbol === EXCHANGE_RATE.to).rate;

            const consumer = consumerDomain(
                CONSUMER_DATA.id,
                CONSUMER_DATA.full_name,
                CONSUMER_DATA.national_id,
                CONSUMER_DATA.email,
                CONSUMER_DATA.address_country,
                CONSUMER_DATA.address_region,
                CONSUMER_DATA.address_city,
                CONSUMER_DATA.address_full_street_address,
                CONSUMER_DATA.address_number,
                CONSUMER_DATA.address_neighborhood,
                CONSUMER_DATA.address_zip_code,
                CONSUMER_DATA.phone,
                CONSUMER_DATA.birth_date
            );

            axios.post(
                CONFIG_BEXS_PAY.url.get_checkout,
                checkoutPayloadDTO(product.price, rate, product.description, consumer),
                checkoutHeadersDomain(responseToken.data.token_type, responseToken.data.access_token)
            ).then((responseCheckout) => {
                const size = product.size_checkout || 'full';
                res.render('checkout-' + size, {url_token: responseCheckout.data.redirect_url, payment_id: responseCheckout.data.id});
            }).catch((errorCheckout) => {
                console.log("errorCheckout", errorCheckout || "Ocurred a error");
                res.redirect('/');
            });

        }).catch((errorExchangeRate) => {
            console.log("errorExchangeRate:", errorExchangeRate || "Ocurred a error");
            res.redirect('/');
        });

    }).catch((errorToken) => {
        console.log("errorToken", errorToken.data || "Ocurred a error");
        res.redirect('/');
    });
}
