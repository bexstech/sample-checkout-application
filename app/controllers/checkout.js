const axios = require('axios');

const configBexsPay = require('../config/bexspay');

// Fiz isso apenas para fins de Sandbox
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = (req, res) => {
    const getTokenPayload = {
        "client_id": configBexsPay.client_id,
        "client_secret": configBexsPay.client_secret,
        "audience": configBexsPay.audience,
        "grant_type": configBexsPay.grant_type
    };

    axios.post(configBexsPay.url.get_token, getTokenPayload, {"headers": {"content-type": "application/json"}})
    .then((responseToken) => {
        const getCheckoutHeader = {
            "headers": {
                "content-type": "application/json",
                "Authorization": responseToken.data.token_type + " " + responseToken.data.access_token

            }
        }

        const getCheckoutPayload = {
            "amount": 2,
            "foreign_amount": 0.50,
            "installments": 5,
            "confirm": true,	
            "consumer": {
                "address": {
                    "city": "São Paulo",
                    "country": "BRA",
                    "full_street_address": "Av. Paulista",
                    "number": "1",
                    "region": "SP",
                    "zip_code": "01311300",
                    "neighborhood": "Vila roque"
                },
                "email": "bruno.cerejo@bexsbanco.com.br",
                "full_name": "Bruno Cerejo",
                "external_id": "costumer-external-id",
                "national_id": "39772136287"
            },
            "billing": {
                 "national_id": "39772136287",
                 "name": "Bruno Cerejo"
             },
            "cart": [
                 {
                     "description": "Premium - Check all the news from Brazil and the world offline and gain unlimited access to all plataforms (iOS, Android and Web)",
                     "quantity": 1,
                     "unit_price": 1.00,
                     "sku": "123erfgfdewq"
                 }
             ],
            "soft_descriptor": "bexspay*checkout",
            "checkout": true,
            "redirect_url": "https://accounts.spotify.com/pt-BR/login",
            "due_date": "2019-05-20"
        };

        axios.post(configBexsPay.url.get_checkout, getCheckoutPayload, getCheckoutHeader)
        .then((responseCheckout) => {
            console.log(responseCheckout.data);
            res.render('checkout-full');
        }).catch((errorCheckout) => {
            console.log("errorCheckout", errorCheckout);
            res.redirect('/');
        });
    }).catch((errorToken) => {
        console.log("errorToken", errorToken.code);
        res.redirect('/');
    });
    
}