const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const chatapp = require('./utils/chatApp');
const bodyParser = require('body-parser');
const chatrout = require('./route/route');
const cors = require('cors');
const serverPort = require('./config');

app.set('views', 'view')
app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', chatrout);

app.get("/", (req, res) => {
    res.render('room');
})

chatapp(io);


server.listen(serverPort.port, () => console.log(`server started at http://localhost:${serverPort.port}`));