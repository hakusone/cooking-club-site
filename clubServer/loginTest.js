const fetch = require('node-fetch');

let site = {
  url: 'http://localhost:3040'
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
            var cookie = res.headers.get('set-cookie');
            var newCookie = new Object;
            cookie.split('; ').forEach(function(eachCookie) {
              splitCookie = eachCookie.split('=');
              newCookie[splitCookie[0]] = splitCookie[1];
            });
            console.log(newCookie);
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
