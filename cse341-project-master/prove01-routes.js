const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        //Add a greeting message
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body>');
        res.write('<h1>User Account creation</h1>');
        res.write('<p>Welcome to the user account creation page</p>');
        res.write('<form action="/create-user" method="POST"><input type="username" name="username"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        //Parse form data and display in the console.
    }

    if (url === '/users' && method === 'POST') {
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body>');
        res.write('<h1>User Account list</h1>');
        res.write('<ul>');
        res.write('<li>TStark</li>');
        res.write('<li>BBanner</li>');
        res.write('<li>PParker</li>');
        res.write('<li>NFury</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
        //Update list of users on the user's page.
    }
}