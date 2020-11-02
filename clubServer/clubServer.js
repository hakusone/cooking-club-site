const fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var app = express();
app.use(bodyParser.json());
var eventsRaw = fs.readFileSync('./eventData.json');
var events = JSON.parse(eventsRaw);
var usersRaw = fs.readFileSync('./clubUsersHash.json');
var users = JSON.parse(usersRaw);

const host = '127.0.0.1';
const port = '3040';

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

app.delete('/activities', function(req, res) {
  var id = req.body.id;
  if (id < 0 || id >= events.length) {
    res.status(404).json({
      error: true,
      message:`Activity ID ${id} not found`
    });
  }
  else {
    events.splice(id, 1);
    res.json(events);
  }
});

app.get('/members', function (req, res) {
  res.json(users.length);
});

app.post('/members', function (req, res) {
  var newMember = req.body;
  var salt = bcrypt.genSaltSync(13);
  var hash = bcrypt.hashSync(newMember.password, salt);
  newMember.password = hash;
  users.push(newMember);
  res.json(users.length);
});

app.delete('/members', function(req, res) {
  var id = req.body.id;
  if (id < 0 || id >= users.length) {
    res.status(404).json({
      error: true,
      message:`User ID ${id} not found`
    });
  }
  else {
    users.splice(id, 1);
    res.json(users.length);
  }
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var matchingUser = users.find(function(user) { // find user with matching email
    return user.email == email;
  });

  if (!matchingUser) { // no users with this email
    res.status(401).json({
      error: true,
      message:`User/Password error`
    });
  }
  else { // a user with this email
    if (bcrypt.compareSync(password, matchingUser.password)) { // password matches
      var returnUser = {
        firstName: matchingUser.firstName,
        lastName: matchingUser.lastName,
        email: matchingUser.email,
        role: matchingUser.role
      }
      res.status(200).json(returnUser);
    }
    else { // password doesn't match
      res.status(401).json({
        error: true,
        message:`User/Password error`
      });
    }
  }
});

app.listen(port, host, function () {
console.log(`clubServer.js app listening on IPv4: ${host}:${port}`);
});


app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.json('Something went wrong.');
});
