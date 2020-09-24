const fs = require('fs');
let fname = __dirname + '/index.html';
let fdata = fs.readFileSync(fname, 'utf-8');
let flines = fdata.split('\n');
console.log('Lines in file index.html: ' + flines.length);
