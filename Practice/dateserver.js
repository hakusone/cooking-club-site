var express = require('express');
var app = express();

var visited = 0;

app.get('/date', function (req, res) {
  date = new Date();
  day = date.toDateString();
  time = date.toTimeString();
  res.send(`Date and Time: ${day} ${time}`);
});

app.get('/netID', function (req, res) {
  id = 'hd3647';
  name = 'Sharon Wong';
  visited++;
  res.send(`Name: ${name} ID: ${id} Number of visits: ${visited}`);
});

host = '127.124.0.1';
port = '9001';

app.listen(port, host, function () {
    console.log(`Date and time app listening on IPv4: ${host}:${port}`);
});
