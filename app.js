require ('custom-env').env();
var app = require("./config/express")();

app.listen(process.env.PORT, function(){
    console.log("Listen on port: 9000");
});