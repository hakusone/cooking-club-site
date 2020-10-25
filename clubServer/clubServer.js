const fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
var eventsRaw = fs.readFileSync('./eventData.json');
var events = JSON.parse(eventsRaw);

app.get('/info', function (req, res) {
  var clubData = {
    "clubName": "Castro Valley Cooking Club",
    "ownerName": "Sharon Wong",
    "ownerNetId": "hd3647"
  }
  res.json(clubData);
});

app.get('/activities', function (req, res) {
  res.json(events);
});

app.post('/activities', function(req, res) {
  var newEvent = req.body;
  events.push(newEvent);
  res.json(events);
});

app.listen(3001, function () {
    console.log(`Club server listening on IPv4: http://localhost:3001`);
});
