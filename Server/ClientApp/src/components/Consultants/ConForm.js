import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';


class ConForm extends Component {
    state = {
      fname: '',
      lname: '',
      company: '',
      website: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      suburb: '',
      city: '',
      country: '',
      postalcode: '',
      desc: '',
      exp: '',
    }

    Auth = new AuthService();

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const {
        fname,
        lname,
        company,
        website,
        email,
        phone,
        address1,
        address2,
        suburb,
        city,
        country,
        postalcode,
        desc,
        exp,
      } = this.state;

      const res = () => fetch('api/Consultants/addConsultant', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          // Authorization : 'Token' +' '+ localStorage.getItem('id_token'),
          Authorization : `Bearer ${this.Auth.getToken()}`,
        },
        body: JSON.stringify({
// I want one email only consultant first name and last name separate
          consultantName: fname,
          // ConsultantLastName: '',
          specialistArea: exp,
          email: email,
          contactemail: email,
          Company: company,
          website: website,
          phone: phone,
          address1: address1,
          address2: address2,
          consultantDesc: desc,
          suburb: suburb,
          postalcode: postalcode,
          city: city,
          country: country,
        }),
      });
      const PostingConsultantInfo = () => res.JSON();
      res();
      console.log(PostingConsultantInfo);
      console.log(res);
    }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            {' '}
                    Name
          </label>
          <br />
          <input name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required />
          <input name="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleChange} required />
          <br />
          <br />
          <label>
                    Area of Expertise
          </label>
          <br />
          <input name="exp" value={this.state.exp} onChange={this.handleChange} required />
          <br />
          <br />
          <label>
                    Company
          </label>
          <br />
          <input name="company" value={this.state.company} onChange={this.handleChange} />
          <br />
          <br />
          <label>
                    Website
          </label>
          <br />
          <input name="website" placeholder="www.company.com" value={this.state.website} onChange={this.handleChange} />
          <br />
          <br />
          <label>
                    Email
          </label>
          <br />
          <input name="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange} required />
          <br />
          {' '}
          <br />
          <label>
                    Phone
          </label>
          <br />
          <input name="phone" placeholder="" value={this.state.phone} onChange={this.handleChange} required />
          <br />
          <br />
          <label>
                    Address
          </label>
          <br />
          <input name="address1" placeholder="Street Number" value={this.state.address1} onChange={this.handleChange} />
          <input name="address2" placeholder="Street Name" value={this.state.address2} onChange={this.handleChange} />
          <br />
          <input name="suburb" placeholder="Suburb" value={this.state.suburb} onChange={this.handleChange} />
          <input name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
          <br />
          <input name="country" placeholder="Country" value={this.state.country} onChange={this.handleChange} />
          <input name="postalcode" placeholder="Postal Code" value={this.state.postalcode} onChange={this.handleChange} />

          <br />
          <br />
          <label>
                    Description
          </label>
          <br />
          <textarea rows="4" cols="40" name="desc" placeholder="Say a few things about yourself" value={this.state.desc} onChange={this.handleChange} />
          <br />
          <input id="submit" name="submit" type="submit" value="Submit" />
        </form>
      );
    }
}

export default ConForm;
