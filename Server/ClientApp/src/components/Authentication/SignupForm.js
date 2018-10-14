import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import './AuthStyle.css';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email1: '',
      email2: '',
      password: '',
      userCreated: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      userName,
      email1,
      password,
    } = this.state;

    fetch('api/auth/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        UserName: userName,
        Email: email1,
        Password: password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          firstName: '',
          lastName: '',
          userName: '',
          email1: '',
          email2: '',
          password: '',
          userCreated: true,
        });
        alert('User Created Successfully');
      }
    })
      .catch();
  }
   render() {
     const {
       firstName, lastName, email1, email2, password, userName,
     } = this.state;

     return (

       <div>
         <ExpansionPanel className="expan-panel">
           <ExpansionPanelSummary>
            <h4>Create An Account</h4>
          </ExpansionPanelSummary>
           <ExpansionPanelDetails>
            <form className="signup-form" onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={userName}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="email1"
                  placeholder="Email"
                  value={email1}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="email2"
                  placeholder="Re-enter Email"
                  value={email2}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input className="signup-button" type="submit" value="SIGN UP" />
              </div>
            </form>
          </ExpansionPanelDetails>
         
         </ExpansionPanel>
       </div>

     );
   }
}
