import React, { Component } from 'react';

class Contact extends Component {

    state = {
        fname: '',
        lname: '',
        email: '',
        message: '',

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <label> Name
              </label>
              <br />
              <input name ="fname" placeholder="First Name" value={this.state.name} onChange={this.handleChange} required/>
              <input name ="lname" placeholder="Last Name" value={this.state.name} onChange={this.handleChange} required/>
              <br />
              <br />
              <label>Email
              </label>
              <br />
              <input name ="email" placeholder="Email" type='email' value={this.state.email} onChange={this.handleChange} required/>
              <br />              <br />
              <label>Message
              </label>
              <br />
              <textarea name ="message" placeholder="Tell us what your message is" value={this.state.message} onChange={this.handleChange} />
              <br />
             <input id="submit" name="submit" type="submit" value="Submit" />
            </form>
        )
    }

}

export default Contact;
