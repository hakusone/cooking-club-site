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
