const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3040'
};

var body = {"id": 'lwVRFuKUCAAIbfMM'};

let p2 = fetch(site.url +'/activities', {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => res.json())
          .then(data => {
            console.log(`Activities after deletion:`)
            console.log(data);
          }
        );

console.log("Testing web requests...");

p2.then();
