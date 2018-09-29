import React from 'react';
import {
  Modal,
  NavItem,
} from 'react-bootstrap';
import AuthService from './AuthService';
import SignupForm from './SignupForm';

export default class LoginModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();

    this.state = {
      show: false,
      open: true,
      userEmail: '',
      userPass: '',
      loggedIn: false,
    };
  }

  handleSubmit = async (event) => {
    const { userEmail, userPass } = this.state;
    event.preventDefault();
    await this.Auth.handleSubmit(event, userEmail, userPass)
      .then((res) => {
        if (res === true) {
          this.setState({ loggedIn: true });
        }
      });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  toggle() {
    const { panel } = this.state.panel;

    if (panel === 'none') {
      this.setState({ panel: 'block' });
    } else {
      this.setState({ panel: 'none' });
    }
  }
 


  render() {
    const { userEmail, userPass, show } = this.state;

    if (this.Auth.loggedIn()) {
      return (
        <button
          type="button"
          onClick={this.props.handleLogout}
        >
          Logout
        </button>
      );
    } else {
      return (
        <div>
          <button  onClick={this.handleShow}>Login</button>

          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Login</h4>
              <form onSubmit={this.handleSubmit}>
                <input
                  placeholder="Email"
                  name="userEmail"
                  type="text"
                  value={userEmail}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="Password"
                  name="userPass"
                  type="password"
                  value={userPass}
                  onChange={this.handleChange}
                />
                <button type="submit" value="">Login</button>
              </form>

              <SignupForm />

            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}
