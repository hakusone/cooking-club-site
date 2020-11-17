const assert = require('chai').assert;
const fetch = require('node-fetch');

/*
  Testing applicant POST
*/

let site = {
  url: 'https://www.drbsclasses.org/student40/node'
};

let goodApplicantData = {
   "name": "Pending Applicant1",
   "email": "applicant1@cvcooking.com",
   "findus": "Word of Mouth",
   "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
};

let tooLongApplicantData =  {
   "name": "Pending Applicant1",
   "email": "applicant1@cvcooking.com",
   "findus": "Word of Mouth",
   "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus pretium est eu pellentesque. Praesent a venenatis sem. Quisque auctor convallis tristique. Nulla facilisi. Sed tempus, orci quis consectetur mattis, felis urna blandit magna, sit amet volutpat ipsum nisl ac dui. Integer accumsan sollicitudin molestie. Nunc tempus vestibulum nulla, eget tempor dolor interdum non. Nunc quam magna, congue ultricies porttitor vitae, blandit quis odio. Nulla vehicula, libero scelerisque facilisis mollis, odio tellus aliquam nulla, ut ultrices augue ante id mi. Suspendisse pulvinar volutpat congue. Ut aliquet mauris in magna tincidunt, vitae auctor purus mattis. Fusce id ante quam. Nullam aliquet tincidunt leo quis vulputate. Integer commodo accumsan orci ac sagittis. Proin iaculis dolor id justo mattis commodo. Donec interdum elit nulla, vitae venenatis turpis sollicitudin nec. Mauris et elit sit amet felis bibendum porttitor. Vestibulum lacinia enim non dolor porta, a condimentum nunc aliquam. Praesent pretium, lacus ac scelerisque maximus, orci velit scelerisque enim, in imperdiet dolor augue ut urna. Vestibulum convallis suscipit ipsum id faucibus. Donec at volutpat dui. Nullam consequat in metus suscipit consectetur. Cras et vulputate nisi. Nunc vel nibh sagittis, laoreet diam at, porttitor lectus. Pellentesque dictum dolor quis dolor porttitor malesuada. Maecenas tincidunt, libero sit amet pharetra eleifend, nibh enim vestibulum ligula, at sodales nisl ipsum ut neque. Cras ac dui ut ligula ultricies feugiat. Curabitur et purus eu augue feugiat venenatis at eget eros. Aenean a mollis lorem, in feugiat mauris. Nam metus diam, egestas sit amet consectetur eget, ullamcorper ut quam. Donec eget justo dignissim, eleifend erat ac, facilisis dui. Quisque ex odio, sagittis ac sapien a, viverra interdum purus. Nullam venenatis lacus vel mi luctus, vel iaculis turpis ullamcorper. Proin viverra suscipit accumsan. Ut at blandit arcu. Vestibulum eget orci pellentesque sapien accumsan rhoncus. Donec in ultricies justo. Morbi ac purus efficitur, euismod quam at, bibendum tortor. Vivamus viverra ac sem non scelerisque. Donec quis orci laoreet erat vehicula hendrerit. Duis tellus ligula, auctor nec lorem non, suscipit auctor sem. Proin ultrices facilisis ligula, vel tempor nunc. Ut vitae porta dolor, ut consectetur sapien. Aliquam lorem quam, mollis vel felis sed, pretium venenatis metus. Duis mattis nisl vel malesuada placerat. In dapibus est eu nisl eleifend, et laoreet elit elementum. Suspendisse in justo dolor."
};

let missingFindusApplicantData = {
    "name": "Pending Applicant1",
    "email": "applicant1@cvcooking.com",
    "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
};

let badEmailApplicantData = {
     "name": "Pending Applicant1",
     "email": "applicant1vcooking.com",
     "findus": "Word of Mouth",
     "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut nisl eget dolor placerat imperdiet. Etiam porttitor a ante eget pharetra. Aliquam pharetra cursus risus, nec dapibus augue viverra eu."
};

describe('Applicant Testing', function() {
  describe('Add Applicant Tests', function() {
    it('Add Good Applicant', function() {
      return fetch(site.url + '/applicants', {
        method: "POST",
        body: JSON.stringify(goodApplicantData),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "OK", "Status OK");
      });
    });

    it('Too Long JSON Applicant', function() {
      return fetch(site.url + '/applicants', {
        method: "POST",
        body: JSON.stringify(tooLongApplicantData),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Payload Too Large", "Exceeded limit of 1000b");
      });
    });

    it('Missing Info Applicant', function() {
      return fetch(site.url + '/applicants', {
        method: "POST",
        body: JSON.stringify(missingFindusApplicantData),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Bad Request", "Bad Request - Missing Data");
      });
    });

    it('Bad Email Applicant', function() {
      return fetch(site.url + '/applicants', {
        method: "POST",
        body: JSON.stringify(badEmailApplicantData),
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        assert.equal(res.statusText, "Bad Request", "Bad Request - Missing Data");
      });
    });
  });
});
