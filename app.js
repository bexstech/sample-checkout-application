require ('custom-env').env();
var app = require("./config/express")();

app.listen(9000, function(){
    console.log("Listen on port: 9000");
});
