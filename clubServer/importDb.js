const Datastore = require('nedb-promises');
let eventsDB = Datastore.create('./eventsDB.db');
let usersDB = Datastore.create('./usersDB.db');

const events = require('./eventData.json');
const users = require('./clubUsersHash.json');

errorMsg = function(err) {
  console.log("Something went wrong when writing.");
  console.log(err);
};

eventsDB.insert(events)
  .then(function(newDocs) {
    console.log("Added " + newDocs.length + " events.");
  })
  .catch(errorMsg);

usersDB.insert(users)
  .then(function(newDocs) {
    console.log("Added " + newDocs.length + " users.");
  })
  .catch(errorMsg);
