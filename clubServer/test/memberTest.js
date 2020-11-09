const assert = require('chai').assert;
const fetch = require('node-fetch');

/*
  Testing Members
*/

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
};

describe('Member Testing', function() {
  loginAsAdmin = function() {
    return fetch(site.url + '/login', {
      method: "POST",
      body: JSON.stringify({
        "email": "tirrivees1820@outlook.com", // correct email
        "password": "49OqspUq" // correct password
      }),
      headers: {'Content-Type': 'application/json'}
    });
  }

  describe('Get Member Tests', function() {
    it('Accessing member list as member', function() {
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
        fetch(site.url + '/members', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'cookie': memberCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Unauthorized", "Unauthorized");
        }));
    });
    it('Login and view with admin', function() {
      var adminCookie = '';
      return loginAsAdmin()
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/members', {
          method: "GET",
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

    it('Returns an array', function() {
      var adminCookie = '';
      return loginAsAdmin()
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/members', {
          method: "GET",
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
          assert.isArray(data, "Returned data is array");
        })
      );
    });

    it('All member elements have email and first names', function() {
      var adminCookie = '';
      return loginAsAdmin()
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/members', {
          method: "GET",
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
          data.forEach(function(user) {
            assert.property(user, 'email', "Member has email");
            assert.property(user, 'firstName', "Member has firstName");
          });
        })
      );
    });
  });

  let newUserId = '';

  var body = {
    "firstName": "Melia2",
    "lastName": "Barker2",
    "email": "sampleEmail1234@outlook.com",
    "password": "samplePassword!",
    "role": "member"
  };

  describe('Add Member Tests', function() {
    it('Try Add member without logging in', function() {
      return fetch(site.url + '/members', {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
    it('Login and Add member with admin', function() {
      var adminCookie = '';
      return loginAsAdmin()
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/members', {
          method: "POST",
          body: JSON.stringify(body),
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
          newMemberId = data.pop()._id;
          assert.isString(newMemberId); // save this to delete later
        })
      );
    });
  });

  describe('Delete Member Tests', function() {
    it('Try Delete member without logging in', function() {
      return fetch(site.url + '/members', {
        method: "DELETE",
        body: JSON.stringify({"id": 'lwVRFuKUCAAIbfMM'}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
    it('Login and Delete with admin', function() {
      var adminCookie = '';
      return loginAsAdmin()
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/members', {
          method: "DELETE",
          body: JSON.stringify({"id": newMemberId}), // delete previously added member
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
      return loginAsAdmin()
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/members', {
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
