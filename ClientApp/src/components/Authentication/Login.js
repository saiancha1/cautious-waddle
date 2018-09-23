import React, { Component } from 'react';
import AuthService from './AuthService';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPass: '',
      loggedIn: false,
      open: false,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
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
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

   handleSubmit = async (event) => {
     event.preventDefault();
     await this.Auth.handleSubmit(event, this.state.userEmail, this.state.userPass)
       .then((res) => {
         if (res === true) {
           this.setState({ loggedIn: true });
         }
       });
   }

  handleLogout1 = (event) => {
    event.preventDefault();
    this.Auth.logout(event).then((res2) => {
      console.log(res2);
      if (res2) this.setState({ loggedIn: false });
    });
  }

  handleLogout = (event) => {
    event.preventDefault();
    const loggedOut = this.Auth.logout(event);
    if (loggedOut) {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    // If user not logged in show login form else they must be logged in so show logout.
    return (
      <div>
        <LoginForm
          userEmail={this.state.userEmail}
          userPass={this.state.userPass}
          loggedIn={this.state.loggedIn}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          logout={this.handleLogout}
        />
      </div>
    );
  }
}

export default Login;
