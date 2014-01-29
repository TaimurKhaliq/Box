var express = require('express');
var app = express();
app.set('view options', { locals: { scripts: ['/libraries/jquery-1.9.1.min.js', 'JSXTransformer-0.8.0.js', 'React-0.8.0.js'] } });  // You can declare the scripts that you will need to render in EVERY page

app.configure(function () {
//    app.use(
//        "/", //the URL throught which you want to access to you static content
//        express.static(__dirname + "/public") //where your static content is located in your filesystem
//
//    );
    app.use("/", express.static(__dirname + '/public'));
});

app.listen(process.env.PORT || 5000); //the port you want to use
