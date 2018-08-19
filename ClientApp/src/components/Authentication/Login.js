import React, { Component } from 'react';
import AuthService from './AuthService';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = AuthService();
  }

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

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            placeholder="Email"
            name="userEmail"
            type="text"
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            name="userPass"
            type="password"
            onChange={() => this.handleChange}
          />
          <input
            value="LOGIN"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default Login;
