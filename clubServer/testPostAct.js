const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3040'
};

var body = {
  "name": "Test Event",
  "dates": [
    "September 20th"
  ],
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
};

let p3 = fetch(site.url +'/activities', {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => res.json())
          .then(data => {
            console.log(`Updated Club Activities:`)
            console.log(data);
          }
        );


console.log("Testing web requests...");
Promise.all([p3]);
