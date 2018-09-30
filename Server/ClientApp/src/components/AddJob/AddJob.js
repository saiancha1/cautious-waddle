import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';

class AddJob extends Component {
  state = {
    loggedIn: AuthService.loggedIn(),
    type: '',
    position: '',
    location: '',
    description: '',
  };

  postDataHandler = () => {
    const post = {
      type: this.state.type,
      position: this.state.position,
      location: this.state.location,
      description: this.state.description,
    };
    // TODO: Change this for a fetch call instead of Axios
    // Axios.post('https://capstone1.azurewebsites.net/api/jobs/addJob',post);
  }

  render() {
    if (this.state.loggedIn === true) {
      return (
      <div>
              <h1>Add Job</h1>
              <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, 
                mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.
{' '}

            </p>
              <form action="/action_page.php" formMethod="post">
                  Type: 
{' '}
<select name="cars">
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Contract">Contract</option>
                          </select>
<br/>
                  Position: 
{' '}
<input type="text" name="position"/>
<br/>
                  Location: 
{' '}
<input type="text" name="location"/>
<br/>
                  Description: 
{' '}
<textarea name="message" rows="10" cols="30"/>
<br/>
                  Image: 
{' '}
<input type="button" value="Upload" name="image"/>
<br/>
                <input type="submit" value="Submit" />
              </form>
            </div>
      );
    } else {
          <div>
                This page is accessible to valid account holders. If you have an account, please login to submit a new job posting.
                </div>;
    }
  }
}
export default AddJob;
