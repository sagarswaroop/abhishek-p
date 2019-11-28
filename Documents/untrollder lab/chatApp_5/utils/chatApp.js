const onlineUser = require('../helper/onlineuseroperation');
const usersList = require('../helper/userlistoperation');
const chatOperation = require('../helper/chathistoryoperation');

function createChatObj(user, msg, client, type) {
    let d = new Date();
    let chatBody = {};
    chatBody.senderEmail = user.email;
    chatBody.reciverEmail = client.email;
    chatBody.message = msg;
    chatBody.msgtype = type;
    chatBody.time = d.toLocaleTimeString();
    chatBody.date = d.toLocaleDateString();
    chatBody.day = d.getDay();
    return chatBody;
}

function addClientinList(user, clientData) {
    let list = {};
    list.email = user.email;
    list.userlist = clientData;
    usersList.search(list, (userobj) => {
        let l = userobj[0].userlist;
        if (l.length > 0) {
            let listEmails = l.map(e => e.email);
            let result = listEmails.includes(clientData.email);
            if (result === true) {} else {
                usersList.update(list);
            }
        } else {
            usersList.update(list);
        }

    });
}

function createSpace(message, client, user, clientid) {
    let createChatSpace = {};
    createChatSpace.id = client.email + "_" + user.email;
    createChatSpace.chatid = clientid;
    createChatSpace.chathistory = [];

    chatOperation.add(createChatSpace, data => {
        if (data) {
            let messagebody = {};
            messagebody.id = data.id;
            messagebody.msg = message;
            chatOperation.update(messagebody);
        }
    });
}

module.exports = chatApp = (io) => {
    io.on('connection', socket => {
        socket.emit("user-connected", " Hi you connected");

        socket.on("user-data", (name, email) => {
            let userdata = {};
            userdata.name = name;
            userdata.email = email;
            userdata.status = "online";
            userdata.address = socket.id;
            userdata.userlist = [];
            if (userdata) {
                onlineUser.add(userdata);
                usersList.add(userdata);
            }

            socket.emit("response-user-data", userdata);

        });



        socket.on('create-user-in-list', (clientMail, user) => {
            onlineUser.search(clientMail, (clientData) => {
                addClientinList(user, clientData);
            })
        });

        socket.on('sent-user-request', (clientMail, senderdata) => {
            onlineUser.search(clientMail, (clientData) => {
                onlineUser.search(senderdata.email, (sender) => {
                    io.to(clientData.address).emit("user-request", sender);
                });
            });
        });

        socket.on('send-message', (message, client, user, clientid) => {
            let messageBody = createChatObj(user, message, client, "send");
            createSpace(messageBody, client, user, clientid);

            onlineUser.search(client.email, (reciver) => {
                onlineUser.search(user.email, (sender) => {
                    let msg = createChatObj(user, message, client, "recive");
                    createSpace(msg, sender, reciver, sender._id);
                    io.to(reciver.address).emit("message-recive", sender, msg);
                });
            });

        });

        socket.on("send-file", (image, client, user) => {
            let messageBody = createChatObj(user, image, client, "send");
            createSpace(messageBody, client, user, client._id);
            onlineUser.search(client.email, (reciver) => {
                onlineUser.search(user.email, (sender) => {
                    let msg = createChatObj(user, image, client, "recive");
                    createSpace(msg, sender, reciver, sender._id);
                    io.to(reciver.address).emit("image-recive", sender, msg);
                });
            });
        });

        socket.on("request-users-list", (userid) => {
            usersList.search(userid, (data) => {
                if (data.length > 0) {
                    let list = data[0].userlist;
                    if (list.length > 0) {
                        socket.emit("response-users-list", list);
                    }
                }
            })
        })

        socket.on("request-chat-history", (clientmail, usermail) => {
            let id = clientmail + "_" + usermail;
            chatOperation.search(id, (chatData) => {
                socket.emit("response-chat-history", chatData);
            })
        })

        socket.on("check-data", (userChatHistory, clientChatHistory, id) => {
            let createchatHistory = {};
            createchatHistory.id = id;
            createchatHistory.userhistory = userChatHistory;
            createchatHistory.clienthistory = clientChatHistory;
        });

    });
}