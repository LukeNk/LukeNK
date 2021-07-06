const fs = require('fs');
const path = require('path');
const http = require('http');

function getFile(path, res) {
    fs.readFile(path, (err, data) => {
        if (err) {};
        if (typeof(res) == 'object') {
            res.write((data) ? data : 'Cannot find');
            res.end();
        } else if (typeof(res) == 'function') {
            res(data);
        }
    })
}

(function() {
    // initial, update APIs
    fs.readFile('API/song/list.html', 'utf8', (err, data) => {
        fs.writeFile('API/song/count', `${(data.match(/<div class="song"/g) || []).length}`, 'utf8', () => {});
    });
})()

let server = http.createServer((req, res) => {
    if (req.url == '/') {
        getFile('index.html', res);
    } else if (path.dirname(req.url) == '/API/link') {
        getFile('.' + req.url, (data) => {
            res.writeHead(301, { "Location": data })
            res.end();
        });
    } else
        getFile('.' + req.url, res);
});
server.listen(8080);

console.log('Server ready');