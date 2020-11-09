const assert = require('chai').assert;
const fetch = require('node-fetch');

/*
  Testing login, logout, and cookies
*/

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
};

// function to parse cookie
parseCookie = function(raw) {
  var newCookie = new Object;
  raw.split('; ').forEach(function(cookie) {
    splitCookie = cookie.split('=');
    newCookie[splitCookie[0]] = splitCookie[1];
  });
  return newCookie;
};

describe('Login Tests', function() {
  it('Cookie with appropriate name is returned', function() {
    return fetch(site.url + '/info', {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      var cookie = parseCookie(res.headers.get('set-cookie'));
      assert.property(cookie, 'hd3647Sid', "Cookie has cookiename hd3647Sid");
    });
  });

  describe('Login Sequence', function() {
    it('Login Good', function() {
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "OK", "Status OK");
      });
    });

    it('User returned', function() {
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        assert.isObject(data, 'data is an object');
        assert.property(data, 'email');
        assert.property(data, 'firstName');
        assert.property(data, 'lastName');
        assert.property(data, '_id');
        assert.notProperty(data, 'password');
      });
    });

    it('Cookie session ID changed', function() {
      var oldCookie = "";
      var newCookie = "";
      return fetch(site.url + '/info', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        oldCookie = parseCookie(res.headers.get('set-cookie'));
      })
      .then(() =>
        fetch(site.url + '/login', {
          method: "POST",
          body: JSON.stringify({
            "email": "aromatised1858@yandex.com", // correct email
            "password": "%\\2o<v/n" // correct password
          }),
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          newCookie = parseCookie(res.headers.get('set-cookie'));
        }))
      .then(res => {
        assert.notEqual(oldCookie['hd3647Sid'], newCookie['hd3647Sid']);
      })
    });

    it('Logout, cookie cleared', function() {
      var oldCookie = "";
      var loginCookie = "";
      var newCookie = "";
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        loginCookie = res.headers.get('set-cookie');
        oldCookie = parseCookie(res.headers.get('set-cookie'));
      })
      .then(() =>
        fetch(site.url + '/logout', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'cookie': loginCookie
          }
        })
        .then(res => {
          newCookie = parseCookie(res.headers.get('set-cookie'));
        }))
      .then(res => {
        assert.notEqual(oldCookie, newCookie);
        assert.equal(newCookie['hd3647Sid'], '');
      })
    });
  });

  describe('Bad Logins', function() {
    it('Bad Email', function() {
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised18581234@yandex.com", // bad email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });

    it('Bad Password', function() {
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n11111" // bad password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
  });
});
