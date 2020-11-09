const express = require('express');
let app = express();
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const host = '127.0.0.1';
const port = '3040';

const Datastore = require('nedb-promises');
let eventsDB = Datastore.create('./eventsDB.db');
let usersDB = Datastore.create('./usersDB.db');

const cookieName = "hd3647Sid";
app.use(session({
  secret: 'Cooking Club Website',
  resave: false,
  saveUninitialized: false,
  name: cookieName
}));

function setUpSessionMiddleware(req, res, next) {
	console.log(`\nsession object: ${JSON.stringify(req.session)}`);
	console.log(`session id: ${req.session.id}`);
	if (!req.session.user) {
		req.session.user = {role: "guest"};
	};
	next();
};

app.use(setUpSessionMiddleware);

function checkMemberMiddleware(req, res, next) {
	if (req.session.user.role === "guest") {
		res.status(401).json({error: "Forbidden"});;
	}
  else {
		next();
	}
};

function checkAdminMiddleware(req, res, next) {
	if (req.session.user.role !== "admin") {
		res.status(401).json({error: "Forbidden"});;
	} else {
		next();
	}
};

let errMsg = function(err) {
  const status = err.status || 500;
  res.status(status);
  res.json('Something went wrong.');
}

app.get('/info', function (req, res) {
  var clubData = {
    "clubName": "Castro Valley Cooking Club",
    "ownerName": "Sharon Wong",
    "ownerNetId": "hd3647"
  }
  res.json(clubData);
});

app.get('/activities', function (req, res) {
  eventsDB.find({})
    .then(function(docs) {
      res.json(docs);
    })
    .catch(errMsg);
});

app.post('/activities', checkAdminMiddleware, express.json(), function(req, res) {
  var newEvent = req.body;
  eventsDB.insert(newEvent)
    .then()
    .catch(errMsg);

  eventsDB.find({})
    .then(function(docs) {
      res.json(docs);
    })
    .catch(errMsg);
});

app.delete('/activities', checkAdminMiddleware, express.json(), function(req, res) {
  var id = req.body.id;

  eventsDB.findOne({_id: id})
    .then(function(doc) {
      if (doc == null) {
        res.status(404).json({
          error: true,
          message: `Activity ID ${id} not found`
        });
      }
      else {
        eventsDB.remove({_id: id})
          .then()
          .catch(errMsg);

        eventsDB.find({})
          .then(function(docs) {
            res.json(docs);
          })
          .catch(errMsg);
      }
    })
    .catch(errMsg);
});

app.get('/members', checkAdminMiddleware, express.json(), function (req, res) {
  usersDB.find({}, {password: 0})
    .then(function(docs) {
      res.json(docs);
    })
    .catch(errMsg);
});

app.post('/members', checkAdminMiddleware, express.json(), function (req, res) {
  var newMember = req.body;
  var salt = bcrypt.genSaltSync(13);
  var hash = bcrypt.hashSync(newMember.password, salt);
  newMember.password = hash;

  usersDB.insert(newMember)
    .then()
    .catch(errMsg);

  usersDB.find({}, {password: 0})
    .then(function(docs) {
      res.json(docs);
    });
});

app.delete('/members', checkAdminMiddleware, express.json(), function(req, res) {
  var id = req.body.id;

  usersDB.findOne({_id: id})
  .then(function(doc) {
    if (doc == null) {
      res.status(404).json({
        error: true,
        message:`User ID ${id} not found`
      });
    }
    else {
      usersDB.remove({_id: id})
        .then()
        .catch(errMsg);

      usersDB.find({}, {password: 0})
        .then(function(docs) {
          res.json(docs);
        });
    }
  })
  .catch(errMsg);
});

app.post('/login', express.json(), function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  usersDB.findOne({"email": email}) // find user with matching email
  .then(function(auser) {
    if (auser == null) { // no user with this email
      res.status(401).json({
        error: true,
        message:`User/Password error`
      });
      return;
    }
    if (bcrypt.compareSync(password, auser.password)) { // password matches
      let oldInfo = req.session.user;
      req.session.regenerate(function(err) {
        if (err) {
          console.log(err);
        }
      })

      let newUserInfo = Object.assign(oldInfo, auser);
      delete newUserInfo.password;
			req.session.user = newUserInfo;
      res.status(200).json(newUserInfo);
    }
    else { // password doesn't match
      res.status(401).json({
        error: true,
        message:`User/Password error`
      });
    }
  })
  .catch(errMsg);
});

app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({message: "Goodbye"});
    })
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
