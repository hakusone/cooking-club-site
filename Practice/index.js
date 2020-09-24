import React from "react";
import ReactDOM from "react-dom";
import events from "./eventData.json" // Importing JSON!

let myName = "Sharon Wong";
// Use some of the events information below

let rows = events.map(function(event) {
  return <tr>
            <td>{event.name}</td>
            <td>{event.dates}</td>
         </tr>;
});

let table = <table>
  <thead>
    <th>Name</th>
    <th>Date(s)</th>
  </thead>
  <tbody>
    {rows}
  </tbody>
</table>;

let contents = <section>
    <h1>Hello from React</h1>
    <h2>{myName}</h2>
    <h3>The number of events is {events.length}</h3>
    {table}
  </section>;

ReactDOM.render(contents, document.getElementById("root"));
