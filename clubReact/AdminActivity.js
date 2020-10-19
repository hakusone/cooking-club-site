import React, {Component} from 'react';
import AddActivity from './AddActivity.js';

class AdminActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events
    }
  }

  addActivity(activity) {
    this.setState({events: this.state.events.concat(activity)});
  }

  deleteActivity(i) {
    let updateEvents = this.state.events.filter(function(event, index) {
      return index != i;
    });
    this.setState({events:updateEvents});
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
      <AddActivity addActivity={this.addActivity.bind(this)} />

      <h3>Activities</h3>
      {table}
    </main>;

    return main;
  }
}

export default AdminActivity;
