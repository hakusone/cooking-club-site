import React from "react";
import ReactDOM from "react-dom";

function winner(name) {
  console.log(`The winner is ${name}`);
}
let myP1 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("P1"), 1000*Math.random());
});
let myP2 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("P2"), 1000*Math.random());
});
let myP3 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve("P3"), 1000*Math.random());
});
let myPs = [myP1, myP2, myP3];
let racingPs = Promise.race(myPs).then(function(value) {
  winner(value);
});

ReactDOM.render(null, document.getElementById("root"));
