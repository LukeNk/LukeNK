const fs = require('fs');
const http = require('http');

function getFile(path, res) {
    fs.readFile(path, (err, data) => {
        if (err) {};
        res.write((data) ? data : 'Cannot find');
        res.end();
    })
}

let server = http.createServer((req, res) => {
    if (req.url == '/') {
        getFile('index.html', res);
    } else
        getFile('.' + req.url, res);
});
server.listen(8080);

console.log('Server ready');