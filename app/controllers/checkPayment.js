const axios = require('axios');

const CONFIG_BEXS_PAY = require('../config/bexspay');
const checkoutHeadersDTO = require('../dto/checkoutHeaders');

module.exports = (req, res) => {
    const paymentID = req.params.payment_id;

    const getTokenPayload = {
        "client_id": process.env.BEXS_API_CLIENT_ID,
        "client_secret": process.env.BEXS_API_CLIENT_SECRET,
        "audience": CONFIG_BEXS_PAY.audience,
        "grant_type": CONFIG_BEXS_PAY.grant_type
    };

    axios.post(CONFIG_BEXS_PAY.url.get_token, getTokenPayload, {"headers": {"content-type": "application/json"}}
    ).then((responseToken) => {
        axios.get(CONFIG_BEXS_PAY.url.get_payment_by_id + "/" + paymentID, checkoutHeadersDTO(responseToken.data.token_type, responseToken.data.access_token)
        ).then((responseCheckoutFeedback) => {
            const { status, type } = responseCheckoutFeedback.data;

            if (paymentSuccedded(status, type)){
                res.render('success', {});
            }else{
                res.render('failed');
            }
            
        }).catch((errorCheckoutFeedback) => {
            console.log("errorCheckoutFeedback", errorCheckoutFeedback.data || "Ocurred a error");
            res.render('failed');
        });
    }).catch((errorToken) => {
        console.log("errorToken", errorToken.data || "Ocurred a error");
        res.render('failed');
    });
}

function paymentSuccedded(status, type){
    return (status === "AUTHORIZED" || status === "CONFIRMED") || (status === "WAITING_CONSUMER" && type === "BANK_SLIP") 
}