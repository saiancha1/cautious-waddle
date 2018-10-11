import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';

class TestPost extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      fname: '',
    }

      }

    data = {
      firstName: 'zib',
      lastName: 'lname',
      imageURL: 'imgu',
      specialistArea: 'exp',
      consultantDesc: 'imgu',
      phone: 'imgu',
      email: 'imgu',
      website: 'imgu',
      address1: 'imgu',
      address2: 'imgu',
      suburb: 'imgu',
      postalCode: 'imgu',
      city: 'imgu',
      country: 'imgu',

    }

    handleSubmit = (e) => {
      e.preventDefault();
      // console.log(this.state);
      // const {
      //   fname,
      // } = this.state;

      const res = () => fetch('/api/Consultants/addConsultant', {
        method: 'POST',
        body: JSON.stringify(this.data),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          // Authorization : 'Token' +' '+ localStorage.getItem('id_token'),
          Authorization : `Bearer ${this.Auth.getToken()}`,
        },
      })
      const PostingInfo = () => res.JSON();
      res();
    }

    // firstName: fname,
    // lastName: 'lname',
    // imageURL: 'imgu',
    // specialistArea: 'exp',
    // consultantDesc: 'imgu',
    // phone: 'imgu',
    // email: 'imgu',
    // website: 'imgu',
    // address1: 'imgu',
    // address2: 'imgu',
    // suburb: 'imgu',
    // postalCode: 'imgu',
    // city: 'imgu',
    // country: 'imgu',
    // JobTitle: 'Kus',
    // JobDescription: 'TEST',
    // Salary: 'NOMONEY',
    // ContactFirstName: name,
    // ContactLastName: '',
    // ContactEmail: '0000@gmail.ccc',
    // ContactPhone: '4444',
    // CompanyName: 'NUDDA',
    // WorkType: 'KUSSSIII',

  
    // // .then(res => res.json())
    // .then(response => console.log('Success', JSON.stringify(response)))
    // .catch(error => console.error('ERROR:', error));
    // const PostingConsultantInfo = () => res.JSON();
    // res();
    // console.log(PostingConsultantInfo);
    // console.log(res);


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