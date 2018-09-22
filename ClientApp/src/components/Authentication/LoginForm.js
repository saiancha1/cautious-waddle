import React from 'react';
import Auth from './AuthService';
import LoginModule from './LoginModal';


const LoginForm = (props) => {
  if (props.loggedIn === false) {
    return (
      <div>
        <LoginModule 
          userEmail={this.state.userEmail}
          userPass={this.state.userPass}
          loggedIn={this.state.loggedIn}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          logout={this.handleLogout}
        />
        {/* <form onSubmit={props.handleSubmit}>
          <input
            placeholder="Email"
            name="userEmail"
            type="text"
            value={props.userEmail}
            onChange={props.handleChange}
          />
          <input
            placeholder="Password"
            name="userPass"
            type="password"
            value={props.userPass}
            onChange={props.handleChange}
          />
          <button type="submit" value="">Login</button>
        </form> */}
      </div>
    );
  } else {
    return (
      <div>
        <button
          type="button"
          onClick={props.logout}
        >
            Logout
        </button>
      </div>
    );
  }
};


export default LoginForm;
