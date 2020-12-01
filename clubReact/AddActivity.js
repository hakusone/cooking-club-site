import React, {Component} from 'react';

class AddActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dates: '',
      description: ''
    }
    this.updateActivities = props.updateActivities;
  }

  updateValue(prop, event) {
    this.state[prop] = event.currentTarget.value;
  }

  addActivityData() {
    let addActivity = this;
    let eventData = {
      name: this.state.name,
      dates: this.state.dates,
      description: this.state.description
    };

    fetch('/activities', {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
        addActivity.updateActivities(data);
    });
  }

  render() {
    let main = <div className="add-activity">
      <form className="grid-form">
        <label>Name</label>
        <input type="text" name="name" onChange={this.updateValue.bind(this, 'name')} />
        <label>Date(s)</label>
        <input type="text" name="dates" onChange={this.updateValue.bind(this, 'dates')} />
        <label>Description</label>
        <input type="text" name="description" onChange={this.updateValue.bind(this, 'description')} />
        <button type="button" onClick={this.addActivityData.bind(this)}>Add</button>
      </form>
    </div>;

    return main;
  }
}

export default AddActivity;
