const fs = require('fs');
let fname = __dirname + '/eventData.json';
let fdata = fs.readFileSync(fname, 'utf-8');
let eventData = JSON.parse(fdata);

eventData.events.forEach(function (event) {
  console.log(event.name);
  console.log(event.dates.join(', '));
  console.log(event.description);
});
