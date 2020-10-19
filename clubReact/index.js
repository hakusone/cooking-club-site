import React from "react";
import ReactDOM from "react-dom";
import events from "./eventData.json";
import Menu from "./menu.js";
import Home from "./home.js";
import Activities from "./Activities.js";
import Login from "./login.js";
import Membership from "./membership.js";
import AdminActivity from "./AdminActivity.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "user",
      show: "home"
    };
  }

  switchShow(state) {
    this.setState({show: state});
  }

  render() {
    let contents = null;

    switch (this.state.show) {
      case "home":
        contents = <Home />;
        break;
      case "activities":
        contents = <Activities events={events} />;
        break;
      case "login":
        contents = <Login />;
        break;
      case "membership":
        contents = <Membership />;
        break;
      case "adminactivity":
        contents = <AdminActivity events={events} />
        break;
      default:
        contents = <h2>Something went wrong.</h2>;
        break;
    }

    return (
      <>
        <Menu role={this.state.role} show={this.state.show} switchShow={this.switchShow.bind(this)}/>
        {contents}
    </>);
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
