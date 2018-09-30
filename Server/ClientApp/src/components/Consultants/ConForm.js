import React, { Component } from 'react';

class ConForm extends Component {
    state = {
      fname: '',
      lname: '',
      company: '',
      website: '',
      email: '',
      phone: '',
      address: '',
      desc: '',
      exp: '',
    }
    // https://f2e78226-4303-434b-9afd-4299b92f3eb5.mock.pstmn.io/api/postit
    // 'api/consultantcontroller/addconsultant'

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const {
        fname,
        lname,
        exp,
        email,
        company,
        website,
        phone,
        address,
        desc,
      } = this.state;

      const res = () => fetch('https://f2e78226-4303-434b-9afd-4299b92f3eb5.mock.pstmn.io/api/postit', {
        method: 'POST',
        header: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ConsultantFirstName: fname,
          ConsultantLastName: lname,
          Expertise: exp,
          Email: email,
          Company: company,
          Website: website,
          Phone: phone,
          Address: address,
          Description: desc,
        }),
      });
      const PostingConsultantInfo = () => res.JSON();
      console.log(PostingConsultantInfo);
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
          <input name="fname" placeholder="First Name" value={this.state.name} onChange={this.handleChange} required />
          <input name="lname" placeholder="Last Name" value={this.state.name} onChange={this.handleChange} required />
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
          <input name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
          <br />
          <br />
          <label>
                    Description
          </label>
          <br />
          <textarea name="desc" placeholder="Say a few things about yourself" value={this.state.desc} onChange={this.handleChange} />
          <br />
          <input id="submit" name="submit" type="submit" value="Submit" />
        </form>
      );
    }
}

export default ConForm;
