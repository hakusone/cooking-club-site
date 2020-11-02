const fetch = require('node-fetch');

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
};

let p1 = fetch(site.url + '/activities', site.options)
          .then(res => res.json())
          .then(data => {
            console.log(`Club Activities:`);
            console.log(data);
          }
        );

var body = {"id": 1};

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

var body = {"id": 4};

let p3 = fetch(site.url +'/activities', {
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
p1.then(p2).then(p3);
