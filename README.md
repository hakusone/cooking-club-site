**Student Name**:  Sharon Wong

**NetID**: hd3647

# Homework #11 Solutions

## Question 1

### (a)

```JSON
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "id": "",
    "title": "Member format base",
    "descriptions": "Member format for import and export. By Sharon Wong",
    "type": "object",
    "properties": {
        "_id": {
            "type": "string"
        },
        "firstName": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "lastName": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "role": {
            "type": "string",
            "enum": ["member", "admin"]
        },
        "password": {
            "type": "string"
        }
    },
    "required": ["firstName", "lastName", "email", "role", "password"],
    "additionalProperties": false
}
```

```javascript
function validate(schema, data) {
  if (!ajv.validate(schema, data)) {
    ajv.errors.forEach(function(error) {
      console.log(error.message + "\n" + JSON.stringify(error));
    });
    return false;
  }
  return true;
}

...
var valid = validate(memberSchema, newMember);
if (!valid) {
  res.status(400).json({
    error: true,
    message: valid
  });
}
```

### (b)

```JSON
{
  "name": "A Satisfying Dinner",
  "dates": "September 21st, September 25th, September 30th, October 5th, October 9th",
  "description": "Wanted to try something new, but didn't think you'd have the time after a long day at work? We'll try recipes that are both quick to make and fulfilling to eat!"
}

```

```JSON
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "id": "",
    "title": "Activity format base",
    "descriptions": "Activity format for import and export. By Sharon Wong",
    "type": "object",
    "properties": {
        "_id": {
            "type": "string"
        },
        "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "dates": {
            "type": "string",
            "minLength": 1,
            "maxLength": 1000
        },
        "description": {
            "type": "string",
            "minLength": 1,
            "maxLength": 3000
        }
    },
    "required": ["name", "dates", "description"],
    "additionalProperties": false
}
```

## Question 2

### (a)



### (b)

```json
{
   "name": "Pending Applicant1",
   "email": "applicant1@cvcooking.com",
   "findus": "Word of Mouth",
   "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
 }
```

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "id": "",
    "title": "Applicant format base",
    "descriptions": "Applicant format for import and export. By Sharon Wong",
    "type": "object",
    "properties": {
        "_id": {
            "type": "string"
        },
        "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "findus": {
            "type": "string",
            "enum": ["Blog", "Word of Mouth", "Local Event Search", "Internet Search", "Email"]
        },
        "comments": {
            "type": "string",
            "maxLength": 1000
        }
    },
    "required": ["name", "email", "findus", "comments"],
    "additionalProperties": false
}
```

### (c)

```javascript
app.post('/applicants', express.json(), function (req, res) {
  var newApplicant = req.body;
  var valid = validate(applicantSchema, newApplicant);
  if (!valid) {
    res.status(400).json({
      error: true,
      message: JSON.stringify(valid)
    });
  }
  else {
    res.status(200).json('Applicant created successfully.');
  }
}, jsonErrors);
```

## Question 3

### (a)

![applicant test image](images/3a.png)

### (b)

![activity add test image](images/3b.png)

### (c)

![member add test image](images/3c.png)]

## Question 4

### (a)


### (b)

### (c)

## Question 5

[Link to deployment](https://www.drbsclasses.org/student40/node/info)
