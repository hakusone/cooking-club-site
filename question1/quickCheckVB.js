const fetch = require("node-fetch");
const urlBase = "http://localhost:3220/"

// Sample data
let goodData1 = {
    "renterInfo": {
      "name": "Dr. Bernstein",
      "cell": "(651)651-6510"
    },
    "sails": [
      {
        "sailName": "Wave4.5",
        "quantity": 1
      }
    ]
};

let goodData2 = {
    "renterInfo": {
      "name": "Dr. Bernstein",
      "cell": "(651)651-6510"
    },
    "sails": [
      {
        "sailName": "Slalom6.5",
        "quantity": 1
      }
    ]
};

let badData1 = {
    "sails": [
      {
        "boardName": "Wave4.5",
        "quantity": 1
      }
    ]
};

let badData2 = {
    "renterInfo": {
      "name": "Dr. Bernstein"
    },
    "sails": [
      {
        "boardName": "Wave5.5",
        "quantity": 1000
      }
    ]
};

async function quickCheck() {
    let res = await fetch(urlBase + "inventory");
    let inventory = await res.json();
    console.log(`Request inventory status code ${res.status} should be 200`);
    // Good return 1
    res = await fetch(urlBase + "rentals", {
        method: "POST",
        body: JSON.stringify(goodData1),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let message = await res.json();
    console.log(`Good rental 1 status code ${res.status}, should be 200`);
    // Good return 2
    res = await fetch(urlBase + "rentals", {
        method: "POST",
        body: JSON.stringify(goodData2),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    message = await res.json();
    console.log(`Good rental 1 status code ${res.status}, should be 200`);
    // Bad return 1
    res = await fetch(urlBase + "rentals", {
        method: "POST",
        body: JSON.stringify(badData1),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    message = await res.json();
    console.log(`Bad rental 1 status code ${res.status}, should be 400`);
    // Bad return 2
    res = await fetch(urlBase + "rentals", {
        method: "POST",
        body: JSON.stringify(badData2),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    message = await res.json();
    console.log(`Bad rental 2 status code ${res.status}, should be 400`);
};

quickCheck();