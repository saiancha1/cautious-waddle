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
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new AuthService();
  }

  // TODO: turn this into conditional render, if logged in just show Log out button.
  // componentWillMount() {
  //   if (this.Auth.loggedIn()) {
  //     this.props.history.replace('/');
  //   }
  // }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
  }

  // TODO: Unsure about this part, example code has - .then(res =>{this.props.history.replace('/');)
  handleSubmit = (event) => {
    event.preventDefault();
    this.Auth.login(this.state.userEmail, this.state.userPass)
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
          <form onSubmit={async (e) => {
            const x = await this.Auth.handleSubmit(e, this.state.userEmail, this.state.userPass)
            .then(res => {
              if(res === true)
              {
                this.setState({"loggedIn":true});
              }
              })
              }}>
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
            <button type="submit" value="">Login</button>
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
