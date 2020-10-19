import React, {Component} from 'react';

class AddActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dates: '',
      description: ''
    }
    this.addActivity = props.addActivity;
  }

  updateValue(prop, event) {
    this.state[prop] = event.currentTarget.value;
  }

  addActivityData() {
    let eventData = {
      name: this.state.name,
      dates: this.state.dates,
      description: this.state.description
    }

    this.addActivity(eventData);
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
