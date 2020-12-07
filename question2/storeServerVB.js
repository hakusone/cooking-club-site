/* A server for a Apple Store. They only sell in unit increments  and
    only carry a limited variety of items as indicated by the starting
    inventory.
*/
const express = require('express');
let app = express();

let inventory = {
  "grannySmith": 2200,
  "fuji": 3030,
  "gravenstein": 1320,
  "honeyCrisp": 1400
};

app.get('/info', function(req, res){
    res.json({storeName: "Apple Store" });
});

app.get('/inventory', function(req, res){
    res.json(inventory);
});

app.post('/fulfill', express.json(), function(req, res){
    let desired = req.body;
    let orderSent = {notFulfilled: []};

    for(itemType in desired) {
        let amount = inventory[itemType];
        if (amount !== undefined && (amount >= 0)) {
            orderSent[itemType] = Math.min(inventory[itemType], desired[itemType]);
            inventory[itemType] -= orderSent[itemType];
            if (orderSent[itemType] !== desired[itemType]) {
                orderSent.notFulfilled.push(itemType);
            }
        } else {
            orderSent.notFulfilled.push(itemType);
        }
    }
    res.send(orderSent);
});

app.post('/stock', express.json(), function(req, res){
    let stockup = req.body;
    let donotCarry = [];

    for(itemType in stockup) {
        let amount = inventory[itemType];
        let added = {};
        if (amount !== undefined && (stockup[itemType] >= 0)) {
            inventory[itemType] += stockup[itemType];
            added[itemType] = stockup[itemType];
        } else {
            stockup.donotCarry = donotCarry.push(itemType);
        }
    }
    res.send({confirm: true, stockup: stockup});
});



port = 3222;
host = 'localhost';
app.listen(port, host, function () {
    console.log(`Apple Store listening on IPv4: ${host}:${port}`);
});


