**Student Name**:  Sharon Wong

**NetID**: hd3647

# Homework #4 Solutions

## Question 1

### (a)

```javascript

events = [
  {
    "name": "A Serene Breakfast",
    "dates": [
      "September 20th",
      "September 27th",
      "October 4th",
      "October 10th"
    ],
    "description": "We take our ease on weekend mornings and make an assortment of cozy breakfast foods to end your weekend on a bright note."
  },
  {
    "name": "A Satisfying Dinner",
    "dates": [
      "September 21st",
      "September 25th",
      "September 30th",
      "October 5th",
      "October 9th"
    ],
    "description": "Wanted to try something new, but didn't think you'd have the time after a long day at work? We'll try recipes that are both quick to make and fulfilling to eat!"
  },
  ...

```

### (b)

### (c)

```javascript
let eventTable = document.getElementById('event-schedule');
events.forEach(function(event) {
  var row = document.createElement('tr');
  var eventName = document.createTextNode(event.name);
  var eventDates = document.createTextNode(event.dates.join(', '));
  var eventDescription = document.createTextNode(event.description);

  var nameCol = document.createElement('td');
  var dateCol = document.createElement('td');
  var descriptionCol = document.createElement('td');
  nameCol.appendChild(eventName);
  dateCol.appendChild(eventDates);
  descriptionCol.appendChild(eventDescription);

  row.appendChild(nameCol)
  row.appendChild(dateCol)
  row.appendChild(descriptionCol);

  eventTable.appendChild(row);
});
```

![Picture of table with generated data](images/1c.png)

## Question 2

### (a)

![Picture of signup form](images/2a.png)

### (b)

![Picture of new navigation](images/2b.png)

## Question 3

### (a)

```html
<h3>Doodle Fun!</h3>
<div>
  <button type="button">Add</button>
  <button type="button">Clear</button>
</div>
<svg id="doodle-fun-svg" width="700" height="400" xmlns="http://www.w3.org/2000/svg" style="background-color: #FAF9F9; margin:15px">
</svg>
```

### (b)

```javascript
let svg = document.getElementById('doodle-fun-svg');

genRandom = function(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

genRandomColor = function() {
  var rgb = [
    genRandom(0, 255),
    genRandom(0, 255),
    genRandom(0, 255)
  ];

  return "rgb(" + rgb.join(', ') + ")";
};

genRandomCircle = function() {
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

  c.setAttribute('r', genRandom(5, 50));
  c.setAttribute('cx', genRandom(25, 675));
  c.setAttribute('cy', genRandom(25, 375));
  c.setAttribute('fill', genRandomColor());
  c.setAttribute('fill-opacity', genRandom(50,100)/100)

  svg.appendChild(c);
};

let addButton = document.getElementById('add-circle');
addButton.addEventListener('click', genRandomCircle);

let clearButton = document.getElementById('clear-all');
clearButton.addEventListener('click', function() {
  svg.innerHTML = '';
});
```

## Question 4

### (a)

```html
<form>
  <label for="signup-name">Name</label>
  <input name="signup-name" type="text" maxlength="20" required>
  <label for="signup-email">Email</label>
  <input name="signup-email" type="email" required>
  <label for="signup-password">Password</label>
  <input name="signup-password" type="password" maxlength="30" minlength="10" required>
  <label for="signup-findus">How did you find us?</label>
  <select name="signup-findus" required>
    <option>Word of Mouth</option>
    <option>Internet Search</option>
    <option>Blog</option>
    <option>Email</option>
    <option>Local Event Search</option>
  </select>
  <label for="signup-comments">Comments?</label>
  <textarea name="signup-comments"></textarea>
  <button type="button">Sign up</button>
</form>
```

### (b)

### (c)

```css

.show {
  display: block;
}

.hide {
  display: none;
}

#ThanksDialog {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(137, 176, 174, 0.5);
}

#ThanksDialog div {
  width: 40%;
  position: absolute;
  top: 30%;
  left: 30%;
  margin: auto;
  padding: 10px;
  text-align: center;
  background-color: #ffd6ba;
  opacity: 100%;
}

```

```javascript
let form = document.querySelector('form');
let thanksDialog = document.getElementById('ThanksDialog');
getThanksDialog = function() {
  var signupName = form.elements['signup-name'].value;
  var signupEmail = form.elements['signup-email'].value;
  var signupFindus = form.elements['signup-findus'].value;

  var dialogText = document.createTextNode(`Your name: ${signupName}, email: ${signupEmail}, found us via ${signupFindus}`);
  var dialogEl = document.getElementById('app-summary');
  dialogEl.innerHTML = '';
  dialogEl.appendChild(dialogText);
  thanksDialog.classList.remove('hide');
  thanksDialog.classList.add('show');
};

let applyButton = document.getElementById('apply-button');
applyButton.addEventListener('click', getThanksDialog);

closeThanksDialog = function() {
  thanksDialog.classList.add('hide');
  thanksDialog.classList.remove('show');
};

let closeButton = document.getElementById('close-dialog-button');
closeButton.addEventListener('click', closeThanksDialog);

```
## Question 5

[Link to website](http://csweb01.csueastbay.edu/~hd3647/clubProject_hw4/index.html)
