const http = require('http');
const fs = require('fs');

const host = '10.0.100.34';
const port = 3000;

const contents = fs.readFileSync('main.html');

const requestListener = function (req, res) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
        }

const server = http.createServer(requestListener);
server.listen(port, host, () => {
console.log(`Server is running on http://${host}:${port}`);
});
