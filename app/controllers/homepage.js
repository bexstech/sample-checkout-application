const plans = require('../config/plans');

module.exports = (req, res) => {
    res.render('index', plans);
}