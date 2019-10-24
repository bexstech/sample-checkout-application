require ('custom-env').env();
var app = require("./config/express")();

app.listen(80, function(){
    console.log("Listen on port: 80");
});