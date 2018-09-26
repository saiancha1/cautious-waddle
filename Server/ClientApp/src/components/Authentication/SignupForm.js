import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email1: '',
      email2: '',
      password: '',
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
      email1,
      password,
    } = this.state;

    fetch('Some url here', {
      method: 'POST',
      header: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fName: firstName,
        lName: lastName,
        email: email1,
        password,
      }),
    }).then(res => res.JSON()).then(res => console.log(res));
  }


  render() {
    const {
      firstName, lastName, email1, email2, password,
    } = this.state;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <h4>Create an account</h4>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>
                  First Name:
                  <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
                </label>
              </div>
              <div>
                <label>
                  Last Name:
                  <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input type="text" name="email1" value={email1} onChange={this.handleChange} />
                </label>
              </div>
              <div>
                <label>
                  Re-enter Email:
                  <input type="text" name="email2" value={email2} onChange={this.handleChange} />
                </label>
              </div>
              <div>
                <label>
                  Password:
                  <input type="password" name="password" value={password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Sign Up" />
              </div>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
