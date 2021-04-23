const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        //Add a greeting message
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="username" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        //Parse form data and display in the console.
    }

    if (url === '/users' && method === 'POST') {
        //Return a list of dummy users
        //Update list of users on the user's page.
    }
}