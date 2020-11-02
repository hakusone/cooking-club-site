const fetch = require('node-fetch');

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
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
