const { Resolver } = require('dns').promises;
const resolver = new Resolver();
// Make various method calls with the resolver object
// as shown below.

let servers = resolver.getServers();
console.log("DNS Servers:");
console.log(servers);

// Use a different domain name here
resolver.resolve4('mynoise.net').then((addresses) => {
    console.log('Address for mynoise.net')
    console.log(addresses);
});

// Use a different domain name here
resolver.resolveAny("wikipedia.org").then(info => {
    console.log('All the info for wikipedia.org:')
    console.log(info);
});
