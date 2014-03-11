var express = require('express');
var connect = require('connect');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var SITE_SECRET = "keyboard cat admin";
var connectUtils = connect.utils;
var needle = require('needle');
var theSocket;
server.listen(process.env.PORT || 7634);

app.configure(function () {
    app.use(connect.cookieParser(SITE_SECRET));
    app.use(express.session({secret: SITE_SECRET, key: 'express.sid'}));
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

io.sockets.on('connection', function(socket){
    theSocket = socket;
});

app.post("/userViewedBusiness", function(req, res){
    var response = req.body.response;
    var item = req.body.item;
    // socket.io push the response UP
    theSocket.emit('businessViewed', { response: response , item: item });
});

app.get('/adminSendNotificationToClient', function(req, res){
    console.log("received request to send notification to client");
    var postData = {
        notification: "This is a fake notification"
    };

    needle.post('http://localhost:5000/pushNotificationToBrowser',
        postData,
        {json: true}
    );

    res.end();
});



