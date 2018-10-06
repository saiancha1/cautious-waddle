import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactEmail: '',
      companyName: '',
      logo: '',
      size: '',
      businessType: '',
      specialistArea: '',
      companyDesc: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      suburb: '',
      postalCode: '',
      city: '',
      country: '',
      summerJobs: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const {
      contactEmail,
      companyName,
      logo,
      size,
      businessType,
      specialistArea,
      companyDesc,
      phone,
      email,
      address1,
      address2,
      suburb,
      postalCode,
      city,
      country,
      summerJobs,
    } = this.state;

    const res = () => fetch('api/companies/addCompany', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Auth.getToken()}`,
      },
      body: JSON.stringify({
        contactEmail: contactEmail,
        companyName: companyName,
        logo: logo,
        size: size,
        businessType: businessType,
        specialistArea: specialistArea,
        companyDesc: companyDesc,
        phone: phone,
        email: email,
        address1: address1,
        address2: address2,
        suburb: suburb,
        postalCode: postalCode,
        city: city,
        country: country,
        summerJobs: summerJobs,
      }),
    });
    const PostingCompany = () => res.JSON();
    res();
    console.log(PostingCompany);
    console.log(res);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  postDataHandler = () => {
    const post = {
      type: this.state.type,
      position: this.state.position,
      location: this.state.location,
      description: this.state.description,
    };
  }

  render() {
    const login = this.props;
    if (login.auth) {
      return (
        <div>
          <h1>Add Company</h1>
          <p>You may add your company listing using the below form</p>
          <p> Please complete all fields and then click submit.</p>
          <form onSubmit={this.handleSubmit}>
            <br />
                  Company Name:
            <input name="companyName" value={this.state.companyName} onChange={this.handleChange} />
            <br />
            <br />
                  Logo:
            <input name="logo" value={this.state.logo} onChange={this.handleChange} />
            <br />
            <br />
                  Size:
            <input name="size" value={this.state.size} onChange={this.handleChange} />
            <br />
            <br />
                  Business Type:
            <input name="businessType" value={this.state.businessType} onChange={this.handleChange} />
            <br />
            <br />
                Speciality:
            <input name="specialistArea" value={this.state.specialistArea} onChange={this.handleChange} />
            <br />
            <br />
                Description:
            <textarea name="companyDesc" value={this.state.companyDesc} onChange={this.handleChange} rows="10" cols="30" />
            <br />
            <br />
                Telephone:
            <input name="phone" value={this.state.phone} onChange={this.handleChange} />
            <br />
            <br />
                Email:
            <input name="email" value={this.state.email} onChange={this.handleChange} />
            <br />
            <br />
                Website:
            <input name="address1" value={this.state.address1} onChange={this.handleChange} />
            <br />
            <br />
                  Address:
            <textarea name="address2" value={this.state.address2} onChange={this.handleChange} rows="10" cols="30" />
            <br />
            <br />
                  Suburb:
            <textarea name="suburb" value={this.state.suburb} onChange={this.handleChange} />
            <br />
            <br />
                  Postal Code:
            <input name="postalCode" value={this.state.postalCode} onChange={this.handleChange} />
            <br />
            <br />
                  City:
            <input name="city" value={this.state.city} onChange={this.handleChange} />
            <br />
            <br />
                  Country:
            <input name="country" value={this.state.country} onChange={this.handleChange} />
            <br />
            <br />
                  Summer Jobs:
            <select name="summerJobs" value={this.state.summerJobs} onChange={this.handleChange} >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <br />
            <br />
            <input id="submit" name="submit" type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>This page is accessible only to valid account holders.</p>
          <p>If you have an account, please login to submit a new company listing.</p>
        </div>);
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);
