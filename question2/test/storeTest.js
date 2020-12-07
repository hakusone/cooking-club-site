const assert = require('chai').assert;
const fetch = require('node-fetch');

let url = 'http://localhost:3222';

checkInventory = function() {
  return fetch(url + '/inventory', {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json());
}

describe('Inventory API Testing', function() {
  it('Returns an object', function() {
    return
      checkInventory()
      .then(data => {
        assert.isObject(data, "Data is object");
      });
  });

  it('Inventory object only contains items of types: grannySmith, fuji, gravenstein, honeyCrisp', function() {
    return checkInventory()
      .then(data => {
        assert.property(data, 'grannySmith');
        assert.property(data, 'fuji');
        assert.property(data, 'gravenstein');
        assert.property(data, 'honeyCrisp');
      });
  });
});

describe('Stock API Testing', function() {
  it('Increases when adding more apple stock', function() {
    let inventory = {};
    let newInventory = {};

    return checkInventory()
      .then(data => {
        inventory = data;
      })
      .then(() =>
        fetch(url + '/stock', {
          method: "POST",
          body: JSON.stringify({
            "grannySmith": 200
          }),
          headers: {'Content-Type': 'application/json'}
        })
      )
      .then(() =>
        checkInventory()
        .then(data => {
          newInventory = data;
          assert.equal(inventory.grannySmith + 200, newInventory.grannySmith);
        })
      );
  });
});


describe('Fulfill API Testing', function() {
  it('Stock never goes negative when fulfilling orders', function() {
    return fetch(url + '/fulfill', {
      method: "POST",
      body: JSON.stringify({
        "gravenstein": 4000
      }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(() =>
      checkInventory()
      .then(data => {
        assert.isAtLeast(data.gravenstein, 0, "New inventory is at least 0");
      })
    );
  });
});

describe('Bad Stock API Testing', function() {
  it('Rejects negative values and issues error code of 400', function() {
    return fetch(url + '/stock', {
      method: "POST",
      body: JSON.stringify({
        "honeyCrisp": -200
      }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      assert.equal(res.status, 400, "Bad Input Status Code");
    });
  });
});
