var express = require('express');
var connect = require('connect');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var SITE_SECRET = "keyboard cat";
var connectUtils = connect.utils;
server.listen(process.env.PORT || 5000);

var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

app.configure(function () {
    app.use(connect.cookieParser(SITE_SECRET));
    app.use(express.session({secret: SITE_SECRET, key: 'express.sid'}));
    app.use("/", express.static(__dirname + '/public'));
});

io.set('authorization', function(data, accept){
    if (!data.headers.cookie) {
        return accept('Session cookie required.', false);
    }

    data.cookie = require('cookie').parse(data.headers.cookie);
    /* NOTE: Next, verify the signature of the session cookie. */
    data.cookie = connectUtils.parseSignedCookies(data.cookie, SITE_SECRET);
    /* NOTE: save ourselves a copy of the sessionID. */
    data.sessionID = data.cookie['express.sid'];

    accept(null, true);
});

io.sockets.on('connection', function(socket){
    var hs = socket.handshake;
    socket.on('getBoxData', function(){
        socket.emit('boxData', { data: [1,2,3,4,5]});
    });

    socket.on('commentAdded', function(data){
        console.log(data);
    });
});



