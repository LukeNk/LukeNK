const fs = require('fs');
const http = require('http');

function getFile(path, res) {
    fs.readFile(path, (err, data) => {
        if (err) {};
        res.write((data) ? data : 'Cannot find');
        res.end();
    })
}

(function() {
    // initial, update APIs
    fs.readdir('API/song', (err, files) => {
        fs.writeFile('API/song/count', `${files.length-1}`, 'utf8', () => {});
    });

})()

let server = http.createServer((req, res) => {
    if (req.url == '/') {
        getFile('index.html', res);
    } else
        getFile('.' + req.url, res);
});
server.listen(8080);

console.log('Server ready');