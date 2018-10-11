import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';
import ImgUpload from './ImgUpload';

class ConForm extends Component {
    state = {
      fname: '',
      lname: '',
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
      imgu: '',
    }

    Auth = new AuthService();

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const {
        fname,
        lname,
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
        imgu,
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

          firstName: fname,
          lastName: lname,
          imageURL: imgu,
          specialistArea: exp,
          consultantDesc: desc,
          phone: phone,
          email: email,
          website: website,
          address1: address1,
          address2: address2,
          suburb: suburb,
          postalCode: postalcode,
          city: city,
          country: country,
        }),
      }).then(res => res.json())
      .then(response => console.log('Success', JSON.stringify(response)));
      // const PostingConsultantInfo = () => res.JSON();
      // res();
      // console.log(PostingConsultantInfo);
      console.log(res);
      // console.log(`Bearer ${this.Auth.getToken()}`);
    }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    render() {
      return (<div>
        {this.Auth.loggedIn() ?  ( 
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
          {/* <label>

           Company
          </label>
          <br />
          <input name="company" value={this.state.company} onChange={this.handleChange}  />
          <br />
          <br /> */}
          <label>
            
                    Website
          </label>
          <br />
          <input name="website" placeholder="www.companyname.com" value={this.state.website} onChange={this.handleChange} />
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

                               Image Url
          </label>
          <br />
          <ImgUpload name = "imgu" value={this.state.imgu} onChange={this.handleChange}  />

          {/* <input name="imgu" placeholder="IMAGE URL" value={this.state.imgu} onChange={this.handleChange} required /> */}
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
          <input id="submit" name="submit" type="submit" value="Submit"/>
        </form>) : (<div> <h2>ERROR 401 - Not Authorized</h2></div>) }
        </div> );
    }
}

export default ConForm;
