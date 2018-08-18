import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
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
          onChange={this.handleChange}
        />
        <input
          value="LOGIN"
          type="submit"
        />
      </div>
    );
  }
}

export default Login;
