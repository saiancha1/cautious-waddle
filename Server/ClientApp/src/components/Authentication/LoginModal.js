import React from 'react';
import {
  Modal,
  NavItem,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { compLoggedIn } from '../../store/reducer';
import AuthService from './AuthService';
import SignupForm from './SignupForm';
// import '../../App.css';
import './AuthStyle.css';


class LoginModal extends React.Component {
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
          const sync = this.props;
          sync.syncLoggedIn();
          this.setState({ loggedIn: true });
          window.location.reload();
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
          className="button-sign"
          type="button"
          onClick={this.props.handleLogout}
        >
          Log out
        </button>
      );
    } else {
      return (
        <div>
          <button className="button-sign" onClick={this.handleShow}>Login</button>

          <Modal className="modal-container" show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-header">Log In To Tech Palmy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="login-form" onSubmit={this.handleSubmit}>
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
                <button type="submit" value="">LOG IN</button>
              </form>

              <SignupForm />

            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}
const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({
  syncLoggedIn: () => dispatch(compLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
