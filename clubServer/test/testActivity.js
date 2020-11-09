const assert = require('chai').assert;
const fetch = require('node-fetch');

/*
  Testing Activities
*/

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
};

describe('Activity Testing', function() {
  describe('Get Activity Tests', function() {
    it('Everything is OK', function() {
      return fetch(site.url + '/activities', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "OK", "Status OK");
      });
    });

    it('Returns an array', function() {
      return fetch(site.url + '/activities', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        assert.isArray(data, "Returned data is array");
      });
    });

    it('All activities elements have name and dates', function() {
      return fetch(site.url + '/activities', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.forEach(function(event) {
          assert.property(event, 'name', "Activity has name");
          assert.property(event, 'dates', "Activity has dates");
        });
      });
    });
  });

  let newActivityId = '';
  describe('Add Activity Tests', function() {
    it('Try Add activity without logging in', function() {
      return fetch(site.url + '/activities', {
        method: "POST",
        body: JSON.stringify({
          "name": "Test Event",
          "dates": [
            "September 20th"
          ],
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
    it('Login and Add activity with member', function() {
      var memberCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        memberCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'member', "user is member");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "POST",
          body: JSON.stringify({
            "name": "Test Event",
            "dates": [
              "September 20th"
            ],
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
          }),
          headers: {
            'Content-Type': 'application/json',
            'cookie': memberCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Unauthorized", "Unauthorized");
        }));
    });
    it('Login and Add activity with admin', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "POST",
          body: JSON.stringify({
            "name": "Test Event",
            "dates": [
              "September 20th"
            ],
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
          }),
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "OK", "Status OK");
          return res.json();
        })
        .then(data => {
          newActivityId = data.pop()._id;
          assert.isString(newActivityId); // save this to delete later
        })
      );
    });
  });

  describe('Delete Activity Tests', function() {
    it('Try Delete activity without logging in', function() {
      return fetch(site.url + '/activities', {
        method: "DELETE",
        body: JSON.stringify({"id": 'lwVRFuKUCAAIbfMM'}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
    it('Login and Delete with member', function() {
      var memberCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        memberCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'member', "user is member");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "DELETE",
          body: JSON.stringify({"id": 'lwVRFuKUCAAIbfMM'}),
          headers: {
            'Content-Type': 'application/json',
            'cookie': memberCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Unauthorized", "Unauthorized");
        }));
    });
    it('Login and Delete with admin', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "DELETE",
          body: JSON.stringify({"id": newActivityId}), // delete previously added activity
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "OK", "Status OK");
          return res.json();
        })
      );
    });
    it('Login and delete with bad data', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "DELETE",
          body: JSON.stringify({"id": 'mYCsEo0iBcGvXMfs'}),
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Not Found", "Status Not Found");
          return res.json();
        })
      );
    });
  });
});
