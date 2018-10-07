import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: '',
      lName: '',
      email: '',
      message: '',
      isVerified: false,
    };

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }


    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSubscribe() {
      if (this.state.isVerified) {
        alert('You have successfully subscribed!');
        // TODO: put sign up code here
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

    recaptchaLoaded() {
      console.log('capcha successfully loaded');
    }

    // handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log(this.state);
    // }

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
                <Col>
                  <input
                    name="fName"
                    placeholder="First Name"
                    value={fName}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
                <Col>
                  <input
                    name="lName"
                    placeholder="Last Name"
                    value={lName}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    id="submit"
                    name="submit"
                    type="submit"
                    value="Send"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Recaptcha
                    sitekey="6Lf923MUAAAAAGtQ_ts1VylvPdByFvmltRwoEC5T"
                    render="explicit"
                    onloadCallback={this.recaptchaLoaded}
                    verifyCallback={this.verifyCallback}
                  />
                </Col>
              </Row>
            </Grid>
          </form>
        </div>
      );
    }
}

export default Contact;
