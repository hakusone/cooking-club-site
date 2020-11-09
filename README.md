**Student Name**:  Sharon Wong

**NetID**: hd3647

# Homework #10 Solutions

## Question 1

### (a)

```JavaScript
const Datastore = require('nedb-promises');
let eventsDB = Datastore.create('./eventsDB.db');
let usersDB = Datastore.create('./usersDB.db');

const events = require('./eventData.json');
const users = require('./clubUsersHash.json');

errorMsg = function(err) {
  console.log("Something went wrong when writing.");
  console.log(err);
};

eventsDB.insert(events)
  .then(function(newDocs) {
    console.log("Added " + newDocs.length + " events.");
  })
  .catch(errorMsg);

usersDB.insert(users)
  .then(function(newDocs) {
    console.log("Added " + newDocs.length + " users.");
  })
  .catch(errorMsg);
```

### (b)

```
GET /activities
POST /activities
DELETE /activities

GET /members
POST /members
DELETE /members

POST /login

```

```JavaScript

app.get('/activities', function (req, res) {
  eventsDB.find({})
    .then(function(docs) {
      res.json(docs);
    })
    .catch(errMsg);
});

app.post('/activities', function(req, res) {
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

app.delete('/activities', function(req, res) {
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

app.get('/members', function (req, res) {
  usersDB.find({}, {password: 0})
    .then(function(docs) {
      res.json(docs);
    })
    .catch(errMsg);
});

app.post('/members', function (req, res) {
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

app.delete('/members', function(req, res) {
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

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  usersDB.findOne({"email": email}) // find user with matching email
  .then(function(doc) {
    if (doc == null) { // no user with this email
      res.status(401).json({
        error: true,
        message:`User/Password error`
      });
    }
    else { // a user with this email
      if (bcrypt.compareSync(password, doc.password)) { // password matches
        var returnUser = {
          firstName: doc.firstName,
          lastName: doc.lastName,
          email: doc.email,
          role: doc.role
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
  })
  .catch(errMsg);
});

```

### (c)

## Question 2

### (a)

```javascript

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

```

### (b)

![Quick cookies](images/2b.png)

### (c)

```javascript
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

```

### (d)

## Question 3

### (a)

```javascript

function checkMemberMiddleware(req, res, next) {
	if (req.session.user.role === "guest") {
		res.status(401).json({error: "Forbidden"});;
	}
  else {
		next();
	}
};

```

### (b)

```javascript
function checkAdminMiddleware(req, res, next) {
	if (req.session.user.role !== "admin") {
		res.status(401).json({error: "Forbidden"});;
	} else {
		next();
	}
};

```

## Question 4

### (a)

![Login, logout testing](images/4a.png)

### (b)

![Activities testing](images/4b.png)

### (c)

![Members testing](images/4c.png)

## Question 5
