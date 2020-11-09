const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3040'
};

var body = {
  "firstName": "Melia2",
  "lastName": "Barker2",
  "email": "sampleEmail1234@outlook.com",
  "password": "samplePassword!",
  "role": "member"
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
