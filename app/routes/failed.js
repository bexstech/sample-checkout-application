module.exports = function(app){
    app.get("/failed", (req, res) => {
        res.render('failed');
    });
}