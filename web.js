var express = require('express');
var connect = require('connect');
var app = express();
var http = require('http');
var https = require('https');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var SITE_SECRET = "keyboard cat";
var connectUtils = connect.utils;
var request = require("request");
var querystring = require("querystring");
server.listen(process.env.PORT || 5000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var boxSchema = mongoose.Schema({
    name: String,
    sessions: Array
});

var sessionId = "";
var Box = mongoose.model('Box', boxSchema);

app.configure(function () {
    app.use(connect.cookieParser(SITE_SECRET));
    app.use(express.session({secret: SITE_SECRET, key: 'express.sid'}));
    app.use("/", express.static(__dirname + '/public'));
    app.use(express.bodyParser());
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
    sessionId = data.sessionID;

    accept(null, true);
});

app.get('/createBox', function(req, res) {
    var _name = req.query.name;
    var _box = new Box({name: _name, sessions: [sessionId], id: new mongoose.Schema.ObjectId});
    _box.save(function(err, _box){
        if (err) {
            console.log("Failed to save");
        }
        console.log("box saved successfully");
    });
});

app.post('/createEvent', function(req, res){
    var ref = req.body.reference;
    var summary = req.body.summary;
    var duration = req.body.duration;
    var language = req.body.language;

    var postData = {
        duration: duration,
        reference: ref,
        summary: summary
    };

    var body = querystring.stringify(postData);

    var options = {
        host: 'maps.googleapis.com',
        port: 443,
        path: '/maps/api/place/event/add/json?sensor=false&key=AIzaSyAjhVOUqyApek1tdeiyKaZOWdLk4EUYHlM',
        method: 'POST',
        headers: {
            accept : '*/*',
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(body)
        }
    };

    var myReq = https.request(options, function(res){
       res.setEncoding('utf8');
       res.on('data', function(chunk){
          console.log("body:" + chunk);
       });
    });

    myReq.write(body);
    myReq.end();
});

function getBox(res, id){
    var _res = res;
    var _callBack = function(err, data) {
        if (err || data.length === 0){
            console.log("Failed to find box");
             _res.send("no box found");
        } else {
            console.log("box found");
            console.log(data);
            res.sendfile(__dirname + '/public/box/box.html');
        }
    }

    Box.find({name: id}, _callBack);
}

app.get('/box/:id', function(req, res){
    var id = req.params.id;
    getBox(res, id);
});

io.sockets.on('connection', function(socket){
    var hs = socket.handshake;

    socket.on('createBox', function() {
    });

    socket.on('getBoxData', function(){
        socket.emit('boxData', { data: [1,2,3,4,5]});
    });

    socket.on('commentAdded', function(data){
        // save comment to the box
        console.log(data);
    });
});



