import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      type: '',
      position: '',
      location: '',
      description: '',
    };

    const Auth = new AuthService();
  }


  postDataHandler = () => {
    const post = {
      type: this.state.type,
      position: this.state.position,
      location: this.state.location,
      description: this.state.description,
    };
    // Axios.post('https://capstone1.azurewebsites.net/api/jobs/addJob',post);
  }

  render() {
    this.setState({ loggedIn: Auth.loggedIn() });

    if (this.state.loggedIn === true) {
      return (
        <div>
          <h1>Add Job</h1>
          <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec,
                mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.
            {' '}

          </p>
          <form action={this.postDataHandler} formMethod="post">
                  Type:
            {' '}
            <select name="cars">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            <br />
                  Position:
            {' '}
            <input type="text" name="position" />
            <br />
                  Location:
            {' '}
            <input type="text" name="location" />
            <br />
                  Description:
            {' '}
            <textarea name="message" rows="10" cols="30" />
            <br />
                  Image:
            {' '}
            <input type="button" value="Upload" name="image" />
            <br />
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
