import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';

class TestPost extends Component {
    state = {
      name: '',
    }

    Auth = new AuthService();

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const {
        name,
      } = this.state;

      const res = () => fetch('/api/jobs/AddJob', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          // Authorization : 'Token' +' '+ localStorage.getItem('id_token'),
          Authorization : `Bearer ${this.Auth.getToken()}`,
        },
        body: JSON.stringify({

          // firstName: fname,
          // lastName: "lname",
          // imageURL: "imgu",
          // specialistArea: "exp",
          // consultantDesc: "desc",
          // phone: "phone",
          // email: "email",
          // website: "website",
          // address1: "address1",
          // address2: "address2",
          // suburb: "suburb",
          // postalCode: "postalcode",
          // city: "city",
          // country: "country",
          JobTitle: 'Kus',
          JobDescription: 'TEST',
          Salary: 'NOMONEY',
          ContactFirstName: name,
          ContactLastName: '',
          ContactEmail: '0000@gmail.ccc',
          ContactPhone: '4444',
          CompanyName: 'NUDDA',
          WorkType: 'KUSSSIII',

        }),
    });
    // .then(res => res.json())
    // .then(response => console.log('Success', JSON.stringify(response)));
    // const PostingConsultantInfo = () => res.JSON();
    res();
    // console.log(PostingConsultantInfo);
    // console.log(res);
}

handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
}

render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <label>
          {' '}
                  Name
        </label>
        <br />
        <input name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required />
        <br />
        <input id="submit" name="submit" type="submit" value="Submit"/>
        </form></div>);
}
}

export default TestPost;