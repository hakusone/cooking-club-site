import React, {Component} from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let main = <main>
      <header>
        <h2>Login</h2>
      </header>

      <form class="grid-form">
        <label>Email</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
        <button type="button">Login</button>
      </form>
    </main>;

    return main;
  }
}

export default Login;
