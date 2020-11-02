const fetch = require('node-fetch');

let site = {
  url: 'https://www.drbsclasses.org/student40/node',
  options: {method: "GET"}
};

let p1 = fetch(site.url + '/info', site.options)
          .then(res => res.json())
          .then(data => {
            console.log(`Club Information:`);
            console.log(data);
          }
        );

let p2 = fetch(site.url + '/activities', site.options)
          .then(res => res.json())
          .then(data => {
            console.log(`Club Activities:`);
            console.log(data);
          }
        );

console.log("Testing web requests...");
Promise.all([p1, p2]);
