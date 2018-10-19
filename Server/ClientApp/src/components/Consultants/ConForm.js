import React, { Component } from 'react';
import './ConForm.css';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AuthService from '../Authentication/AuthService';
import history from '../history';


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
      selectedFile: null,
      imgu: null,
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

      this.checkforImage = () => {
        if (imgu == null) {
          try {
            alert('Please Submit selected Image Before Submitting Consultant');
            return false;
          } catch (error) {
            alert('There seems to be a problem!');
            return false;
          }
        }
      };

      const res = () => {
        if (this.checkforImage() == false) {
          return false;
        } else {
          fetch('api/Consultants/addConsultant', {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              // Authorization : 'Token' +' '+ localStorage.getItem('id_token'),
              Authorization: `Bearer ${this.Auth.getToken()}`,
            },
            body: JSON.stringify({

              firstName: fname,
              lastName: lname,
              imageURL: imgu,
              specialistArea: exp,
              consultantDesc: desc,
              phone,
              email,
              website,
              address1,
              address2,
              suburb,
              postalCode: postalcode,
              city,
              country,
            }),
          });
          this.handleSubscribe();
        }
      };

      const PostingConsultantInfo = () => res.json();
      res();
      console.log(PostingConsultantInfo);
      console.log(res);
      console.log(`Bearer ${this.Auth.getToken()}`);
    }


    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSubscribe() {
      try {
        alert('Thank you for your consultant submission. Your posting will appear after approval.');
        history.push('/consultants');
      } catch (error) {
        alert('There seems to be a problem!');
      }
    }

    fileSelectedHandler = (event) => {
      this.setState({
        selectedFile: event.target.files[0],
      });
    }


      handleImageUpload = (e) => {
        e.preventDefault();
        console.log(this.state.selectedFile);
        const mydata = new FormData();
        const file = this.state.selectedFile;

        mydata.append('file', file);
        console.log(this.state.selectedFile);

          <div>
            {file == null ? (console.log('do nothing'))
              : (fetch('api/Consultants/addConsultantImage', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('id_token')}`,
                },
                body: mydata,
              }).then((res) => {
                res.json()
                  .then((retrieveddata) => {
                    const iii = retrieveddata;
                    console.log(iii);
                    this.setState({
                      imgu: iii.imageUrl,
                    });
                    console.log(this.state.imgu);
                  });
              })

              )

      }

          </div>;
      };

      render(props) {
        const { classes } = this.props;

        return (
          <div div className="contact-wrapper">
            {this.Auth.loggedIn() ? (

              <form onSubmit={this.handleSubmit}>
                <h2>Add Consultant</h2>
                <Grid>
                  <Row>
                    <label>
                    Name
                    </label>
                  </Row>
                  <Row>
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-r" name="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange} required />
                    </Col>
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-l" name="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleChange} required />
                    </Col>

                  </Row>
                  <br />
                  <Row>
                    <label>
                    Area of Expertise
                    </label>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <input className="contact-email" name="exp" value={this.state.exp} onChange={this.handleChange} required />
                    </Col>

                  </Row>
                  <br />
                  <Row>
                    <label>

                    Website
                    </label>
                  </Row>
                  <Row>
                    {' '}
                    <Col xs={12}>
                      {' '}
                      <input className="contact-email" name="website" value={this.state.website} onChange={this.handleChange} />
                    </Col>
                    {' '}

                  </Row>
                  {' '}
                  <br />
                  <Row>
                    <label>Email </label>
                    {' '}
                    <label>Phone</label>
                  </Row>
                  <Row>
                    {' '}
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-r" name="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleChange} required />
                    </Col>


                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-l" name="phone" placeholder="+64 xxx-xxx-xxxx" value={this.state.phone} onChange={this.handleChange} required />
                    </Col>
                    {' '}

                  </Row>
                  <br />
                  <Row>
                    <label>

                               Image Url
                    </label>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Input type="file" onChange={this.fileSelectedHandler} required />
                      <Button onClick={this.handleImageUpload} variant="contained" color="default" required>
Submit
                        <CloudUploadIcon />
                      </Button>
                    </Col>
                    {' '}
                  </Row>
                  <br />

                  <Row>
                    <label>
                    Address
                    </label>
                  </Row>
                  <Row>
                    {' '}
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-r" name="address1" placeholder="Street Number" value={this.state.address1} onChange={this.handleChange} />
                    </Col>
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-l" name="address2" placeholder="Street Name" value={this.state.address2} onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="contact-name" xs={12} sm={6}>

                      <input className="msg-name-r" name="suburb" placeholder="Suburb" value={this.state.suburb} onChange={this.handleChange} />
                    </Col>
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-l" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-r" name="country" placeholder="Country" value={this.state.country} onChange={this.handleChange} />
                    </Col>
                    <Col className="contact-name" xs={12} sm={6}>
                      <input className="msg-name-l" name="postalcode" placeholder="Postal Code" value={this.state.postalcode} onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <label>
                    Description
                    </label>
                  </Row>
                  <Row>
                    <textarea className="contact-msg" name="desc" placeholder="Say a few things about yourself" value={this.state.desc} onChange={this.handleChange} />
                  </Row>
                  <input id="submit" name="submit" type="submit" value="Submit" />
                </Grid>

              </form>) : (
                <div>
                  {' '}
                  <h2>ERROR 401 - Not Authorized</h2>
                </div>
            ) }
          </div>
        );
      }
}

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConForm);
