var express = require('express');
var app = express();
app.configure(function () {
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );
});
app.listen(process.env.PORT || 5000); //the port you want to use
app.get("/makeBox", function(req,res) {
    res.send("MAKING U BOX BITCH");
});