import React, { Component } from 'react';
import AuthService from './AuthService';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPass: '',
      loggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }

  // TODO: turn this into conditional render, if logged in just show Log out button.
  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
  }

  // TODO: Unsure about this part, example code has - .then(res =>{this.props.history.replace('/');)
  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(
        this.setState({ loggedIn: true }),
      )
      .catch((err) => {
        alert(err);
      });
  }

  handleLogout() {
    this.Auth.logout();
  }

  render() {
    // If user not logged in show login form else they must be logged in so show logout.
    if (this.state.loggedIn === false) {
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <input
              placeholder="Email"
              name="userEmail"
              type="text"
              value={this.state.userEmail}
              onChange={this.handleChange}
            />
            <input
              placeholder="Password"
              name="userPass"
              type="password"
              value={this.state.userPass}
              onChange={this.handleChange}
            />
            <input
              value="LOGIN"
              type="submit"
            />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <button type="button" onClick={this.handleLogout}>Logout</button>
        </div>
      );
    }
  }
}

export default Login;
