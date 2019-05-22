const homepage = require('../controllers/homepage');

module.exports = function(app){
    app.get("/", homepage);
}