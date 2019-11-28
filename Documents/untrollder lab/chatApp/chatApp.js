// const app = require('./app');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = chatApp = (io, rooms) => {

    io.on('connection', socket => {

        let chatdata = [];

        console.log("room object during connection ", rooms);
        socket.on('new-user', (room, name) => {
            socket.join(room);
            rooms[room].users[socket.id] = name;
            socket.to(room).broadcast.emit('user-connected', name)
        })
        socket.on('send-message-chat', (room, message) => {
            chatdata.push(`${room}-${message}`);
            socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
        })
        socket.on('disconnect', () => {
            getUserRooms(socket).forEach(room => {
                socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
                delete rooms[room].users[socket.id]
            });
        });

        function getUserRooms(socket) {
            return Object.entries(rooms).reduce((names, [name, room]) => {
                if (room.users[socket.id] != null) names.push(name)
                return names;
            }, []);
        }
    });



    // io.on('connection', socket => {

    //     // var upload = multer({
    //     //     dest: path.join(__dirname, '/data')
    //     // })

    //     console.log("user connected");

    //     socket.emit('users-list', clients);

    //     // socket.on('new-user', userdata => {
    //     //     user = userdata
    //     //     console.log("username", user);
    //     //     socket.join(user.name);
    //     //     io.in(user.name).emit('user-connected', user.name + " is " + user.status);
    //     //     socket.broadcast.emit('user-connected', name);
    //     // });

    //     socket.on('send-message-chat', messageData => {
    //         console.log("messag is", messageData);
    //         io.in(user.name).emit('chat-message', { message: messageData });
    //     });

    //     socket.on('disconnect', () => {
    //         console.log("someone Disconnected...");

    //     });
    // });

}