import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';
import './contact.css';

// This is a contact form, that allows user to submit a message to the admin support

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: '',
      lName: '',
      email: '',
      msg: '',
      isVerified: false,
    };

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  // input field changes state held
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    // when the captcha field is verified, the post request to the bbackedn API is processed
    handleSubscribe(e) {
      if (this.state.isVerified) {
        e.preventDefault();
        console.log(this.state);

        const res = () => {
          fetch('/api/emailing/sendContactForm', {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: this.state.fName,
              lastName: this.state.lName,
              emailAddress: this.state.email,
              message: this.state.msg,

            }),
          });
        };

        const PostingConsultantInfo = () => res.json();
        res();
        window.location.reload();
        alert('Your message has been sent, thank you.');
      } else {
        alert('Please verify that you are a human!');
      }
    }

    verifyCallback(response) {
      if (response) {
        this.setState({
          isVerified: true,
        });
      }
    }

    render() {
      const {
        fName, lName, email, message,
      } = this.state;
      return (
        <div className="contact-wrapper">
          <form onSubmit={this.handleSubscribe}>
            <h2>Contact Us</h2>
            <Grid>
              <Row>
                <Col className="contact-name" xs={12} sm={6}>
                  <input
                    className="msg-name-r"
                    name="fName"
                    placeholder="First Name"
                    value={this.state.fName}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
                <Col className="contact-name" xs={12} sm={6}>
                  <input
                    className="msg-name-l"
                    name="lName"
                    placeholder="Last Name"
                    value={this.state.lName}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <input
                    className="contact-email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <textarea
                    className="contact-msg"
                    name="msg"
                    placeholder="Message"
                    value={this.state.msg}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <div className="contact-input-wrap">
                <Row>
                  <Col xs={12}>
                    <Recaptcha
                      className="recaptcha"
                      sitekey="6Lf923MUAAAAAGtQ_ts1VylvPdByFvmltRwoEC5T"
                      render="explicit"
                      // onloadCallback={this.recaptchaLoaded}
                      verifyCallback={this.verifyCallback}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <input
                      className="contact-send"
                      id="submit"
                      name="submit"
                      type="submit"
                      value="Send"
                    />
                  </Col>
                </Row>
              </div>

            </Grid>
          </form>
        </div>
      );
    }
}

export default Contact;
