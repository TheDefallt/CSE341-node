const fs = require('fs');
let userList = '';

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    

    if (url === '/') {
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

    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            userList += `<li>${message}</li>`;
            console.log(message);
            return res.end();
        });
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Prove 01</title></head>');
        res.write('<body>');
        res.write('<h1>User Account list</h1>');
        res.write('<ul>');
        res.write('<li>TStark</li>');
        res.write('<li>BBanner</li>');
        res.write('<li>PParker</li>');
        res.write('<li>NFury</li>');
        res.write(userList);
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
}

module.exports = requestHandler;
