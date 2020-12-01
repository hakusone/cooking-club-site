import React, {Component} from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.switchShow = props.switchShow;
    this.updateUser = props.updateUser;
  }

  logoutUser() {
    let menu = this;
    return fetch('logout', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(function(data) {
      menu.updateUser({
        role: "guest",
        email: "",
        name: ""
      });

      menu.switchShow('home');
    });
  }

  render() {
    let contents = null;

    let roleNav = {
      "guest" : ["home", "activities", "login", "membership"],
      "member" : ["home", "activities", "logout"],
      "admin" : ["home", "activities", "adminactivity", "logout"],
    }

    let roleNavOptions = roleNav[this.props.role];
    let activeComponent = this.props.show;
    let menu = this;

    let displayNavOptions = [];

    roleNavOptions.forEach(function (option) {
      var isActive = activeComponent == option ? 'active' : '';
      switch (option) {
        case "home":
          displayNavOptions.push(<li key="home" className={isActive} onClick={menu.switchShow.bind(menu, 'home')}><a>Home</a></li>);
          break;
        case "activities":
          displayNavOptions.push(<li key="activities" className={isActive} onClick={menu.switchShow.bind(menu, 'activities')}><a>Activities</a></li>);
          break;
        case "login":
          displayNavOptions.push(<li key="login" className={isActive} onClick={menu.switchShow.bind(menu, 'login')}><a>Login</a></li>);
          break;
        case "adminactivity":
          displayNavOptions.push(<li key="adminactivity" className={isActive} onClick={menu.switchShow.bind(menu, 'adminactivity')}><a>Manage Activities</a></li>);
          break;
        case "membership":
          displayNavOptions.push(<li key="membership" className={isActive} onClick={menu.switchShow.bind(menu, 'membership')}><a>Sign Up</a></li>);
          break;
        case "logout":
          displayNavOptions.push(<li key="logout" className={isActive} onClick={menu.logoutUser.bind(menu)}><a>Logout</a></li>);
          break;
        default:
          break;
      }
    });

    contents = <nav>
      <ul>
        {displayNavOptions}
      </ul>
    </nav>;

    return contents;
  }
}

export default Menu;
