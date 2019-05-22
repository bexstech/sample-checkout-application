const checkout = require('../controllers/checkout');

module.exports = function(app){
    app.post("/checkout", checkout);
}