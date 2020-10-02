import React, {Component} from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let contents = null;

    let roleNav = {
      "guest" : ["home", "activities", "login", "membership"],
      "user" : ["home", "activities", "logout"],
      "admin" : ["home", "activities", "logout"],
    }

    let roleNavOptions = roleNav[this.props.role];
    let activeComponent = this.props.show;

    let displayNavOptions = [];

    roleNavOptions.forEach(function (option) {
      var isActive = activeComponent == option ? 'active' : '';
      switch (option) {
        case "home":
          displayNavOptions.push(<li key="home" className={isActive}><a>Home</a></li>);
          break;
        case "activities":
          displayNavOptions.push(<li key="activities" className={isActive}><a>Activities</a></li>);
          break;
        case "login":
          displayNavOptions.push(<li key="login" className={isActive}><a>Login</a></li>);
          break;
        case "membership":
          displayNavOptions.push(<li key="membership" className={isActive}><a>Sign Up</a></li>);
          break;
        case "logout":
          displayNavOptions.push(<li key="logout" className={isActive}><a>Logout</a></li>);
        break;
        default:
          break;
      }
    });

    contents = <nav>
      <ul>
        {displayNavOptions}
      </ul>
    </nav>

    return contents;
  }
}

export default Menu;
