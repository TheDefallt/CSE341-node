const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {
    addMessage(data, false)
})

// Post message to board
const postMessage = () => {
    const message = messageEl.value;
    const from = user.value;
    const time = new Date().toLocaleTimeString();

    const data = {message, from, time};

    socket.emit('message', data);

    addMessage(data, true);

    messageEl.value = '';
}

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, user = false) => {
    chatBox.innerHTML += `
        <li class="message${user ? ' uMessage' : ''}">
            ${data.from} @${data.time}: ${data.message}
        </li>
    `;
}
