# Online Final Fall 2020 CS651 Grade Sheet

**Sharon Wong**, NetId: hd3647

Start Time:  10:15AM   Last Commit Graded: 11:54AM

**Total:** 48 points

## Question 1: A Validating JSON Server (21 pts)

* Code style deductions
* Schema style deductions

### (a) JSON schema for a particular type of data (13 pts)

* Create a file `rentalSchema.json` that contains a JSON schema to validate *rental* information that gets sent to the server. There should be reasonable checks for all inputs.

* All rentals must include *renterInfo* and have reasonable length strings for both *name* and *cell*.

* Customers can rent more than one item hence an array is used to store equipment type and quantity. The types of items and their quantities should have reasonable limits. 

X -2 didn't check for invalid sail type.

### (b) Server Implementation (8 pts)

You will create a file `rentalServer.js` for an `express.js` based server with the following functionality:

* Server must run on proper port on *localhost*.

* Return store total inventory GET path `/inventory`.

* Keeps a list of *rentals* in an array.

* Implements a POST `/rentals` interface to take in rentals. X -2

* Implements a GET `/rentals` interface to furnish a list of all current rentals. 

## Question 2: JSON Server Testing (25 pts)!

### (a) Inventory API Testing (10 pts)

Test that the GET `/inventory` interface which returns the current store inventory, i.e., the current items available from the store.

* Returns an object
* The "inventory" object only contains items of the types: .

### (b) Stock API  Testing (5 pts)

**Create** a test to check that the inventory increases after a POST to this interface. Note that you only have to check this for one of the items.

### (c) Fulfill API Testing (5 pts)

**Create** a test to check that inventory can never go *negative* for an item even if we submit a request for an arbitrarily large number of items.

### (d) Bad Input Testing (5 pts)

**Create** a test that checks if the *stock* API rejects negative values and issues an error/status code of 400.
