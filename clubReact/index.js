import React from "react";
import ReactDOM from "react-dom";
import events from "./eventData.json";
import Menu from "./menu.js";
import Home from "./home.js";
import Activities from "./Activities.js";
import Login from "./login.js";
import Membership from "./membership.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "user",
      show: "home"
    };
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
      default:
        contents = <h2>Something went wrong.</h2>;
        break;
    }

    return (
      <>
        <Menu role={this.state.role} show={this.state.show}/>
        {contents}
    </>);
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
