import React, {Component} from 'react';
import AddActivity from './AddActivity.js';

class AdminActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    let activities = this;
    let data = fetch('activities', {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      activities.setState({events: data});
    });
  }

  updateActivities(activities) {
    this.setState({events: activities});
  }

  deleteActivity(i) {
    let activities = this;
    let id = this.state.events[i]._id;

    fetch('activities', {
      method: "DELETE",
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      activities.setState({events: data});
    });
  }

  render() {
    let events = this.state.events;
    let admin = this;
    let rows = events.map(function(event, i) {
      return <tr key={"event"+i}>
                <td><button type="button" onClick={admin.deleteActivity.bind(admin, i)}>Delete</button></td>
                <td>{event.name}</td>
                <td>{event.dates}</td>
                <td>{event.description}</td>
             </tr>;
    });

    let table = <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Dates</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>;

    let main = <main>
      <header>
        <h2>Activity Management</h2>
      </header>

      <p>▼ Add Activity</p>
      <AddActivity updateActivities={this.updateActivities.bind(this)} />

      <h3>Activities</h3>
      {table}
    </main>;

    return main;
  }
}

export default AdminActivity;
