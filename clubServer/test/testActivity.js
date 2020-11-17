const assert = require('chai').assert;
const fetch = require('node-fetch');

/*
  Testing Activities
*/

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
};

describe('Activity Testing', function() {
  describe('Get Activity Tests', function() {
    it('Everything is OK', function() {
      return fetch(site.url + '/activities', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "OK", "Status OK");
      });
    });

    it('Returns an array', function() {
      return fetch(site.url + '/activities', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        assert.isArray(data, "Returned data is array");
      });
    });

    it('All activities elements have name and dates', function() {
      return fetch(site.url + '/activities', {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.forEach(function(event) {
          assert.property(event, 'name', "Activity has name");
          assert.property(event, 'dates', "Activity has dates");
        });
      });
    });
  });

  let newActivityId = '';
  describe('Add Activity Tests', function() {
    it('Try Add activity without logging in', function() {
      return fetch(site.url + '/activities', {
        method: "POST",
        body: JSON.stringify({
          "name": "Test Event",
          "dates": "September 20th",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
    it('Login and Add activity with member', function() {
      var memberCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        memberCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'member', "user is member");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "POST",
          body: JSON.stringify({
            "name": "Test Event",
            "dates": "September 20th",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
          }),
          headers: {
            'Content-Type': 'application/json',
            'cookie': memberCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Unauthorized", "Unauthorized");
        }));
    });
    it('Login and Add activity with admin', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "POST",
          body: JSON.stringify({
            "name": "Test Event",
            "dates": "September 20th",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl mi, sagittis quis tellus in, sodales tincidunt neque. Donec non scelerisque diam."
          }),
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "OK", "Status OK");
          return res.json();
        })
        .then(data => {
          newActivityId = data.pop()._id;
          assert.isString(newActivityId); // save this to delete later
        })
      );
    });

    it('Add Too Big Activity', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "POST",
          body: JSON.stringify({
            "name": "Test Event",
            "dates": "September 20th",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus pretium est eu pellentesque. Praesent a venenatis sem. Quisque auctor convallis tristique. Nulla facilisi. Sed tempus, orci quis consectetur mattis, felis urna blandit magna, sit amet volutpat ipsum nisl ac dui. Integer accumsan sollicitudin molestie. Nunc tempus vestibulum nulla, eget tempor dolor interdum non. Nunc quam magna, congue ultricies porttitor vitae, blandit quis odio. Nulla vehicula, libero scelerisque facilisis mollis, odio tellus aliquam nulla, ut ultrices augue ante id mi. Suspendisse pulvinar volutpat congue. Ut aliquet mauris in magna tincidunt, vitae auctor purus mattis. Fusce id ante quam. Nullam aliquet tincidunt leo quis vulputate. Integer commodo accumsan orci ac sagittis. Proin iaculis dolor id justo mattis commodo. Donec interdum elit nulla, vitae venenatis turpis sollicitudin nec. Mauris et elit sit amet felis bibendum porttitor. Vestibulum lacinia enim non dolor porta, a condimentum nunc aliquam. Praesent pretium, lacus ac scelerisque maximus, orci velit scelerisque enim, in imperdiet dolor augue ut urna. Vestibulum convallis suscipit ipsum id faucibus. Donec at volutpat dui. Nullam consequat in metus suscipit consectetur. Cras et vulputate nisi. Nunc vel nibh sagittis, laoreet diam at, porttitor lectus. Pellentesque dictum dolor quis dolor porttitor malesuada. Maecenas tincidunt, libero sit amet pharetra eleifend, nibh enim vestibulum ligula, at sodales nisl ipsum ut neque. Cras ac dui ut ligula ultricies feugiat. Curabitur et purus eu augue feugiat venenatis at eget eros. Aenean a mollis lorem, in feugiat mauris. Nam metus diam, egestas sit amet consectetur eget, ullamcorper ut quam. Donec eget justo dignissim, eleifend erat ac, facilisis dui. Quisque ex odio, sagittis ac sapien a, viverra interdum purus. Nullam venenatis lacus vel mi luctus, vel iaculis turpis ullamcorper. Proin viverra suscipit accumsan. Ut at blandit arcu. Vestibulum eget orci pellentesque sapien accumsan rhoncus. Donec in ultricies justo. Morbi ac purus efficitur, euismod quam at, bibendum tortor. Vivamus viverra ac sem non scelerisque. Donec quis orci laoreet erat vehicula hendrerit. Duis tellus ligula, auctor nec lorem non, suscipit auctor sem. Proin ultrices facilisis ligula, vel tempor nunc. Ut vitae porta dolor, ut consectetur sapien. Aliquam lorem quam, mollis vel felis sed, pretium venenatis metus. Duis mattis nisl vel malesuada placerat. In dapibus est eu nisl eleifend, et laoreet elit elementum. Suspendisse in justo dolor."
          }),
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Payload Too Large", "Exceeded limit of 1000b");
          return res.json();
        })
      );
    });

    it('Missing Fields Activity', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "POST",
          body: JSON.stringify({
            "name": "Test Event",
            "dates": "dates"
          }),
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Bad Request", "Missing Fields");
          return res.json();
        })
      );
    });
  });

  describe('Delete Activity Tests', function() {
    it('Try Delete activity without logging in', function() {
      return fetch(site.url + '/activities', {
        method: "DELETE",
        body: JSON.stringify({"id": 'lwVRFuKUCAAIbfMM'}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Unauthorized", "Unauthorized");
      });
    });
    it('Login and Delete with member', function() {
      var memberCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "aromatised1858@yandex.com", // correct email
          "password": "%\\2o<v/n" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        memberCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'member', "user is member");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "DELETE",
          body: JSON.stringify({"id": 'lwVRFuKUCAAIbfMM'}),
          headers: {
            'Content-Type': 'application/json',
            'cookie': memberCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Unauthorized", "Unauthorized");
        }));
    });
    it('Login and Delete with admin', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "DELETE",
          body: JSON.stringify({"id": newActivityId}), // delete previously added activity
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "OK", "Status OK");
          return res.json();
        })
      );
    });
    it('Login and delete with bad data', function() {
      var adminCookie = '';
      return fetch(site.url + '/login', {
        method: "POST",
        body: JSON.stringify({
          "email": "tirrivees1820@outlook.com", // correct email
          "password": "49OqspUq" // correct password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        adminCookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then(data => {
        assert.isObject(data, "data is object");
        assert.equal(data.role, 'admin', "user is admin");
      })
      .then(() =>
        fetch(site.url + '/activities', {
          method: "DELETE",
          body: JSON.stringify({"id": 'mYCsEo0iBcGvXMfs'}),
          headers: {
            'Content-Type': 'application/json',
            'cookie': adminCookie
          }
        })
        .then(res => {
          assert.equal(res.statusText, "Not Found", "Status Not Found");
          return res.json();
        })
      );
    });
  });
});
