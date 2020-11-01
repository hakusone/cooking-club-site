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
