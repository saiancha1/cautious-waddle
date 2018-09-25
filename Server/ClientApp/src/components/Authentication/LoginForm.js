import React from 'react';
import Auth from './AuthService';


const LoginForm = (props) => {
  if (props.loggedIn === false) {
    return (<div>
      <form onSubmit={props.handleSubmit}>
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
      </form>
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
