import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import AuthService from '../../Authentication/AuthService';
import UserManagementTable from './UserManagementTable';
import Login from '../../Authentication/Login';
import Typography from '@material-ui/core/Typography';

class UserManagement extends Component {
  state = {
    users: [],
    view: 'ViewUsers',
    open: false,
    isAdmin: false,
    delUserId: '',
    successModal: false,
  }


  async componentWillMount() {
    fetch('api/auth/isAdmin', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isAdmin: true });
        }
      });
    fetch('api/auth/getUsers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    }).then(res => res.json())
      .then((json) => {
        json.map(v => v.isDisabled = true);
        this.setState({ users: json });
      })
      .catch(() => { this.setState({ isAdmin: false }); });
  }

    handleEdit = (data) => {
      this.setState({ users: data });
    }

    handleChange = (n, e, fieldName) => {
      fetch('api/auth/isAdmin', {
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ isAdmin: true });
          } else {
            this.setState({ isAdmin: false });
          }
        });
      const data = this.state.users;
      n[fieldName] = e.target.value;
      const index = data.indexOf(n);
      if (index !== null) {
        data[index] = n;
        this.setState({ users: data });
      }
      e.preventDefault();
    }

    handleSave = (n) => {
      const data = this.state.users;
      const index = data.indexOf(n);
      if (index !== -1) {
        data[index] = n;

        fetch('api/Auth/UpdateUser', {
          method: 'POST',

          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          },
          body: JSON.stringify(n),
        })
          .then(res => res.json())
          .then((response) => {
            this.setState({ users: data });
            if (response.result === 'User Added Successfully') {
              alert('Done');
            } else {
              alert('Not Done');
            }
          })
          .catch(() => { alert('Failed To Update'); });
      }
    }

    handleDelete = (n, e) => {
      this.setState({ open: true });
      this.setState({ delUserId: n });

      e.preventDefault();
    }

    handleDialogClose = () => {
      this.setState({ open: false });
    }

    handleUserDelete = (n, e) => {
      if (n !== '') {
        fetch(`api/auth/deleteUser?Id=${n}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
        })
          .then((res) => {
            if (res.status === 200) {
              this.setState({ open: false });
              alert('User Successfully deleted');
            }
          })
          .catch(() => {
            alert('An error has occuerd');
          });
        e.preventDefault();
      }
    }

    render() {
      if (this.state.isAdmin === true) {
        return (
          <div>
            <UserManagementTable
              data={this.state.users}
              handleEdit={this.handleEdit}
              handleSave={this.handleSave}
              handleChange={this.handleChange}
              handleDelete={this.handleDelete}
            />

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
              Are you sure you would like to delete this user?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
              No
                </Button>
                <Button onClick={(e) => { this.handleUserDelete(this.state.delUserId, e); }} color="primary">
              Yes
                </Button>
              </DialogActions>
            </Dialog>
            
          </div>
        );
      } else {
        return (
          <div>No Access</div>
        );
      }
    }
}

export default UserManagement;
