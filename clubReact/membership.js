import React, {Component} from 'react';

class Membership extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let main = <main>
      <header>
        <h2>Sign up!</h2>
      </header>

      <form class="grid-form">
        <label for="signup-name">Name</label>
        <input name="signup-name" type="text" maxlength="20" required />
        <label for="signup-email">Email</label>
        <input name="signup-email" type="email" required />
        <label for="signup-password">Password</label>
        <input name="signup-password" type="password" maxlength="30" minlength="10" required />
        <label for="signup-findus">How did you find us?</label>
        <select name="signup-findus" required>
          <option>Word of Mouth</option>
          <option>Internet Search</option>
          <option>Blog</option>
          <option>Email</option>
          <option>Local Event Search</option>
        </select>
        <label for="signup-comments">Comments?</label>
        <textarea name="signup-comments"></textarea>
        <button id="apply-button" type="button">Sign up</button>
      </form>
    </main>;

    return main;
  }
}

export default Membership;
