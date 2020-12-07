const express = require('express');
let app = express();
const fs = require('fs');
const  Ajv = require('ajv');
const ajv = new Ajv();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const rentalSchema = require("./rentalSchema.json");

var inventoryRaw = fs.readFileSync('./inventoryVB.json');
var inventory = JSON.parse(inventoryRaw);
let rentals = [];

function validate(schema, data) {
  if (!ajv.validate(schema, data)) {
    ajv.errors.forEach(function(error) {
      console.log(error.message + "\n" + JSON.stringify(error));
    });
    return false;
  }
  return true;
}

const host = 'localhost';
const port = '3220';

// GET /inventory
app.get('/inventory', function (req, res) {
  res.json(inventory);
});

// POST /rentals
app.post('/rentals', function (req, res) {
  var newRental = req.body;

  var valid = validate(rentalSchema, newRental);
  if (!valid) {
    res.status(400).json({
      error: true,
      message: `Invalid formatting for rental`
    });
  }
  else {
    res.status(200).json({
      message: `Accepted rental`
    });
  }
});

// GET /rentals
app.get('/rentals', function (req, res) {
  res.json(rentals);
});

app.listen(port, host, function () {
console.log(`rentalServer.js app listening on IPv4: ${host}:${port}`);
});
