import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ firstName: event.target.value });
  }

  render() {
    const { firstName } = this.state;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <h4>Create an account</h4>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <form>
              <label>
                First Name:
                <input type="text" value={firstName} onChange={this.handleChange} />
              </label>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
