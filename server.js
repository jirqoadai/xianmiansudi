const express = require('express');
const path    = require('path');
const http    = require('http');
const https   = require('https');
const fs      = require('fs');

const server  = express();

server.set('port', process.env.PORT || 10001);

// route
server.use('/mrxm', express.static(path.join(__dirname, './mrxm')));
server.use('/fonts', express.static(path.join(__dirname, './fonts')));
server.use('/css', express.static(path.join(__dirname, './css')));
server.use('/js', express.static(path.join(__dirname, './js')));
server.use('/img', express.static(path.join(__dirname, './img')));
server.use('/favicon.ico', express.static(path.join(__dirname, './favicon.ico')));
server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})


http.createServer(server).listen(server.get('port'), (err) => {
    if (err) {
        throw err
    }
    console.log(`Application worker ${process.pid} started... at port ${server.get('port')}`);
});

var options = {
    key: fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt')
}

https.createServer(options, server).listen(10087, (err) => {
    if (err) {
        throw err
    }
    console.log(`Application https worker ${process.pid} started ... at port 10087`);
})