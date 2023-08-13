const socket = io('http://localhost:8000')

// Here are the DOM elements getting them with ID or Class
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// audio that will play on receiving message 
var receive = new Audio('receive.mp3')
var send = new Audio('send.mp3')

// Function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        receive.play();
    }

    // else if (position =='right'){ 
    //     send.play();
    //     }
}

// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');

    socket.emit('send', message);
    messageInput.value = ''
})

document.addEventListener("DOMContentLoaded", function() {
    var icon = document.getElementById("moon-icon");
    var logo = document.getElementById("chatLogo")

    icon.onclick = function(){
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")){
            icon.src = "sun-solid.png"
            logo.src = "logo-dark-mode.png"
        }

        else{
            icon.src = "moon-solid.svg"
            logo.src = "logo-light-mode.png"
        }

    };
});

