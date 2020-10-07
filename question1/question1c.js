/* All Your JavaScript goes here! */

let subButton = document.getElementById('SubButton');

subButton.addEventListener('click', function () {
  let animal = document.getElementById('AnimalSpot').value;
  let date = document.getElementById('SpotDate').value;
  let time = document.getElementById('SpotTime').value;
  let name = document.getElementById('NameSpot').value;

  var spottedText = `Animal: ${animal}, Date: ${date} at ${time}, by ${name}`;
  console.log(spottedText);

  var spottedTextNode = document.createTextNode(spottedText);
  var spottedListItemNode = document.createElement('li');
  spottedListItemNode.appendChild(spottedTextNode);
  var historyOfSpotsList = document.querySelector('.historyOfSpots').querySelector('ol');
  historyOfSpotsList.appendChild(spottedListItemNode);
});
