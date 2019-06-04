const checkPayment = require('../controllers/checkPayment');

module.exports = function(app){
    app.get("/payment/:payment_id", checkPayment);
}