# CS 651: Web Systems Project

## Cooking Club Website

A responsive multi-user website with authentication and access control, built with Node.js, Express.js, React, NEDB, with Mocha/Chai as the testing suite.

## To Run Locally

in the directory `clubServer`, run:
* `npm install` - installs node.js dependencies
* `npm run build` - runs `node importDb.js` and `node clubServer.js` to start a server on localhost, port 3040
  * check if it's running by going to `localhost:3040/activities`

in the directory `clubReact`, run:
* `npm install` - installs node.js dependencies
* `node proxy.js` - runs the app on localhost, port 1234 and creates a proxy to the node.js server
  * check if it's running and connected to node.js server by going to: `localhost:1234` and clicking on the activities tab