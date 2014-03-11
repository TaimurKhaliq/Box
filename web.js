var express = require('express');
var connect = require('connect');
var app = express();
var http = require('http');
var https = require('https');
var theSocket;
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var SITE_SECRET = "keyboard cat";
var connectUtils = connect.utils;
var needle = require('needle');

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
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

io.sockets.on('connection', function(socket){
    var hs = socket.handshake;
    theSocket = socket;

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

app.get('/createEvent', function(req, res){
    var ref = req.query.reference;
    var summary = req.query.summary;
    var duration = req.query.duration;

    var postData = {
        duration: 1500,
        reference: ref,
        summary: summary
    };

    res.writeHead(200, {
        'Content-Type' : 'x-application/json'
    });

    needle.post('https://maps.googleapis.com/maps/api/place/event/add/json?sensor=false&key=AIzaSyBspEevznjXmBIgxYwUb1QGoWjv-B8GPlI',
        postData,
        {json: true, ssl: true},
        handleResponse
    );

    function handleResponse(error, response, body){
        if (!error && response.statusCode == 200) {
            console.log(body); // Print the google web page.

            res.end(JSON.stringify(response.body));
        } else {
            console.log(error);
        }
    }
});

app.get('/getDetails', function(req, res) {
    var url = 'https://maps.googleapis.com/maps/api/place/details/json?&reference='+ req.query.reference + '&sensor=false&key=AIzaSyBspEevznjXmBIgxYwUb1QGoWjv-B8GPlI';
    needle.post(url, {json: true, ssl: true}, callback);

    res.writeHead(200, {
        'Content-Type' : 'x-application/json'
    });

    function callback(error, response, body) {
       if (!error && response.statusCode == 200) {
           console.log(response);
           res.end(JSON.stringify(response.body));
       }
   };
});

app.post('/sendNotification', function(req, res){
   var response = req.body.response;
   var item = req.body.item;

   var postData = {
       response: response,
       item: item
   };

   needle.post('http://localhost:7634/userViewedBusiness',
        postData,
        {json: true, ssl: true}
   );
});

app.post('/pushNotificationToBrowser', function(req, res) {
   console.log("RECEIVED PUSH NOTIFICATION REQUEST FROM ADMIN");
   theSocket.emit("notificationReceived", { response: req.body.notification });
   res.end(); // end the response
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





