const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const chatapp = require('./chatApp');
const bodyParser = require('body-parser')
    // const chatrout = require('./route/route');
const path = require('path');
const fileUpload = require('./fileuploader');

app.set('views', 'view')
app.set('view engine', 'ejs')
app.use(express.static('public'))
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// var name = '';

const rooms = {};

app.get('/', (req, res) => {
    res.render('index', { rooms: rooms });
});

app.post('/room', (req, res) => {
    console.log('req body is', rooms[req.body.room]);
    console.log("romm object inside post method**", rooms);

    if (rooms[req.body.room] != null) {
        console.log("under if statment...");
        return res.redirect('/');
    }
    console.log("outside if body inside post body");
    rooms[req.body.room] = { users: {} };
    console.log("user object in post is", rooms[req.body.room] = { users: {} });
    res.redirect(req.body.room);
    io.emit('room-created', req.body.room);

});

app.get('/:room', (req, res) => {
    if (rooms[req.params.room] == null) {
        return res.redirect('/');
    }
    // console.log('req param is', req.params.room);
    res.render('room', { roomName: req.params.room });
});

chatapp(io, rooms);

// app.use('/', chatrout);

server.listen(process.env.PORT || 3000, () => console.log("server started at http://localhost:3000"));