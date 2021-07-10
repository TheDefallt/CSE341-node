// const session = require("express-session")

const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// Login user to access chat room.
const login = () => {
    console.log('Login attempt');

    //Get username from the page
    const userName = usernameInput.value;
    
    //Blank out the error message
    errorContainer.textContent = '';

    //Make sure username is not empty
    if(!userName){
        errorContainer.innerHTML = 'Username cannot be blank.'
        return
    }

    const data = postData('/login', {userName});

    socket.emit('newUser', userName);
    window.location = '/chat';
}