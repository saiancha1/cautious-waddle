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

    // this.handleFirstName = this.handleFirstName.bind(this);
    // this.handleLastName = this.handleLastName.bind(this);
    // this.handleEmail = this.handleEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleFirstName(event) {
  //   this.setState({ firstName: event.target.value });
  // }

  // handleLastName(event) {
  //   this.setState({ lastName: event.target.value });
  // }

  // handleEmail(event) {
  //   this.setState({ email: event.target.value });
  // }
  handleChange(e) {
      this.setState(
        {
          [e.target.name]: e.target.value,
        },
      );
    }
  
  render() {
    const { firstName, lastName, email1, email2, password } = this.state;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <h4>Create an account</h4>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form>
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
              </div>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
