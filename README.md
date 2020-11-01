**Student Name**:  Sharon Wong

**NetID**: hd3647

# Homework #9 Solutions

## Question 1

### (a)

```
HTTP GET /activities
success: 200. Return all activities in the database
roles: guest, member, admin
```

received:

```json
[
  {
    "activity-id": 1,
    "name": "A Serene Breakfast",
    "dates": [
      "September 20th",
      "September 27th",
      "October 4th",
      "October 10th"
    ],
    "description": "We take our ease on weekend mornings and make an assortment of cozy breakfast foods to end your weekend on a bright note."
  },
  {
    "activity-id": 2,
    "name": "A Satisfying Dinner",
    "dates": [
      "September 21st",
      "September 25th",
      "September 30th",
      "October 5th",
      "October 9th"
    ],
    "description": "Wanted to try something new, but didn't think you'd have the time after a long day at work? We'll try recipes that are both quick to make and fulfilling to eat!"
  },
  {
    "activity-id": 3,
    "name": "A Delightful Dessert",
    "dates": [
      "September 26th",
      "October 2nd",
      "October 11th"
    ],
    "description": "We try our hand at a sweet or savory dessert dish. Get creative and make enough to share!"
  }
]

```

```
HTTP POST /activities
success: 201. Create new activity and redirect to new activity page
failure: 400. Bad request (missing fields)
roles: admin
```

sent:
```json
{
  "name": "A New Breakfast",
  "dates": [
    "September 26th"
  ],
  "description": "A different kind of breakfast!"
}

```

```
HTTP DELETE /activities/{activity-id}
success: 200. Delete activity of id {activity-id}
failure: 404. Not found if id is not found
roles: admin
```

sent:

```json
{
  "activity-id": 1
}

```

### (b)

```
HTTP GET /members
success: 200. Return all members in the database
roles: admin
```

received:
```json
[
  {
    "member-id": 1,
    "name": "Admin User",
    "role": "admin",
    "email" "admin@cvcooking.com"
  },
  {
    "member-id": 2,
    "name": "Normal Member1",
    "role": "member",
    "email" "member1@cvcooking.com"
  },
  {
    "member-id": 3,
    "name": "Normal Member2",
    "role": "member",
    "email" "member2@cvcooking.com"
  }
]

```

```
HTTP POST /members
success: 201. Create new member
failure: 400. Bad request (missing fields)
roles: admin
```

sent:
```json
{
  "name": "Normal Member3",
  "email" "member3@cvcooking.com"
}
```


```
HTTP DELETE /members/{member-id}
success: 200. Delete member of id {member-id}
failure: 404. Not found if id is not found
roles: admin
```

sent:

```json
{
  "member-id": 2
}

```

### (c)

```
HTTP GET /applicants
success: 200. Return all applicants in the database
roles: admin
```

received:
```json
[
  {
    "applicant-id": 4,
    "name": "Pending Applicant1",
    "email": "applicant1@cvcooking.com",
    "findus": "Word of Mouth",
    "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
  },
  {
    "applicant-id": 5,
    "name": "Pending Applicant2",
    "email": "applicant2@cvcooking.com",
    "findus": "Blog",
    "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
  },
  {
    "applicant-id": 6,
    "name": "Pending Applicant3",
    "email": "applicant3@cvcooking.com",
    "findus": "Local Event Search",
    "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
  }
]

```

```
HTTP POST /applicants
success: 201. Create new applicant
roles: guest, admin
```

sent:
```json
{
  "name": "Pending Applicant4",
  "email" "applicant3@cvcooking.com"
  "findus": "Local Event Search",
  "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
}

```

```
HTTP DELETE /applicants/{applicant-id}
success: 200. Delete applicant of id {applicant-id}
failure: 404. Not found if id is not found
roles: admin
```
sent:

```json
{
  "applicant-id": 3
}

```


## Question 2

### (a)

```javascript
users.forEach(function (user) {
  var salt = bcrypt.genSaltSync(nRounds);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  hashedUsers.push(user);
});
```

```json
[
  {
    "firstName": "Melia",
    "lastName": "Barker",
    "email": "tirrivees1820@outlook.com",
    "password": "$2a$10$LbpaBhHp0dFA0axob.D95Ozxk5i/Mv5OxRaDH4Bn.cxFLO6Km/Ut2",
    "role": "admin"
  },
  {
    "firstName": "Demetrice",
    "lastName": "Parker",
    "email": "chihuahua1899@gmail.com",
    "password": "$2a$10$2GhEd6dm.m6lBtt9aNjfm.ZnY6pWTjpmJc08CPFzyua.qg1OBGCfm",
    "role": "member"
  },
  {
    "firstName": "Ligia",
    "lastName": "Hudson",
    "email": "umbrate1989@yahoo.com",
    "password": "$2a$10$W2VWNCLBxEzeJWz4RGTx1ezxgC20vyAlz3/sVAg.laMRpFreVWD3e",
    "role": "member"
  }
]
```

### (b)

![Password hashing](images/2b.png)

## Question 3

### (a)

```javascript
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
})
```

### (b)

### (c) Get All Members

```javascript
app.get('/members', function (req, res) {
  res.json(users.length);
});
```

test script:
```javascript
const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3001'
};

let p1 = fetch(site.url + '/members', site.options)
          .then(res => res.json())
          .then(data => {
            console.log(`Member count:`);
            console.log(data);
          }
        );

console.log("Testing web requests...");
Promise.all([p1]);

```
### (d) Add Member

```javascript
app.post('/members', function (req, res) {
  var newMember = req.body;
  var salt = bcrypt.genSaltSync(13);
  var hash = bcrypt.hashSync(newMember.password, salt);
  newMember.password = hash;
  users.push(newMember);
  res.json(users.length);
});
```

```javascript
const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3001'
};

var body = {
  "firstName": "Melia2",
  "lastName": "Barker2",
  "email": "sampleEmail1234@outlook.com",
  "password": "samplePassword!",
  "role": "user"
};

let p3 = fetch(site.url +'/members', {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => res.json())
          .then(data => {
            console.log(`New Member count:`)
            console.log(data);
          }
        );


console.log("Testing web requests...");
Promise.all([p3]);
```

### (e) Delete Member

```javascript
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
```

```javascript
const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3001'
};

let p1 = fetch(site.url + '/members', site.options)
          .then(res => res.json())
          .then(data => {
            console.log(`Member count:`);
            console.log(data);
          }
        );

var body = {"id": 1};

let p2 = fetch(site.url +'/members', {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => res.json())
          .then(data => {
            console.log(`Member count after deletion:`)
            console.log(data);
          }
        );

var body = {"id": 1223};

let p3 = fetch(site.url +'/members', {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
          console.log(`Member count after deletion:`)
          console.log(data);
        }
      );

console.log("Testing web requests...");
p1.then(p2).then(p3);

```

## Question 4

### (a)

```javascript

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
```

### (b)

```javascript
const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3001'
};

let p1 = fetch(site.url +'/login', {
            method: "POST",
            body: JSON.stringify({
              "email": "aromatised1858@yandex.com",
              "password": "%\\2o<v/n"
            }),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => {
            console.log("Trying good login...");
            console.log(`After good login status:`)
            console.log(res.statusText);
            return res.json();
          })
          .then(data => console.log(data));

let p2 = fetch(site.url +'/login', {
            method: "POST",
            body: JSON.stringify({
              "email": "aromatised18581232@yandex.com",
              "password": "%\\2o<v/n"
            }),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => {
            console.log("Trying bad email...");
            console.log(`After bad email status:`)
            console.log(res.statusText);
            return res.json();
          })
          .then(data => console.log(data));

let p3 = fetch(site.url +'/login', {
            method: "POST",
            body: JSON.stringify({
              "email": "aromatised1858@yandex.com",
              "password": "%\\2o<v/n1111"
            }),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => {
            console.log("Trying bad password...");
            console.log(`After bad password status:`)
            console.log(res.statusText);
            return res.json();
          })
          .then(data => console.log(data));

p1.then(p2).then(p3);
```


![Login testing output](images/5b.png)

## Question 5
