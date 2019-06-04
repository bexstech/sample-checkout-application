var express = require("express");
var load = require("express-load");
var bodyParser = require('body-parser');

module.exports = function(){
    var app = express();

    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.set('view engine', 'pug');
    app.set('views','./app/views');

    load('routes', {cwd: 'app'})
    .into(app);

    return app;
}
