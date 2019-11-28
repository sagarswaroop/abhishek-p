let user = document.getElementById("user").addEventListener("click", test);

function test(user) {
    let name = user.childNodes.getElementById('name').value;
    alert("name", name);
}
























const socket = io.connect('http://localhost:3000');
const messageForm = document.getElementById('message-sent');
const messageInput = document.getElementById('message');
const messageContainer = document.getElementById('message-container');
var imageInput = document.getElementById('image');
var userName = document.getElementById("userName");
// var inputfile = document.getElementById('file');
const roomContainer = document.getElementById('room-container');
// var uploadfile = document.getElementById('uploadfile');
// var sagar = document.getElementById('sagar');


if (messageForm != null) {
    // const name = prompt('What is your name?')
    appendMessages('You joined');
    // socket.emit('new-user', roomName, name);

    messageForm.addEventListener('submit', e => {
        console.log("message function call");
        e.preventDefault();
        let message = messageInput.value;
        socket.emit('send-message-chat', roomName, message);
        messageInput.value = '';
    });

}

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});



socket.on('chat-message', data => {
    appendMessages(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessages(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessages(`${name} disconnected`)
});

socket.on('users-list', clients => {
    // console.log('clients are ', clients)
});

socket.on("user-connected", data => {
    console.log(data);
})

function callMe() {
    socket.emit('chekc-data', { msg: "Hello ! i am sagar" });
    socket.on("send-back", data => {
        console.log("request data is", data);
    })
}



// sagar.addEventListener('click', () => {
//     let user = {};
//     console.log("event is");
//     // appendMessages(sagar.textContent);
//     user.name = sagar.textContent;
//     user.status = "online";
//     socket.emit('new-user', user);
// });


// socket.on('user-connected', data => {
//     console.log("data is", data);
//     userName.innerText = data;
// });



function appendMessages(message) {
    let messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}


socket.on('file-data', data => {
    appendMessages(`${data.file}`);
});