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
import JobManagementTable from './JobManagementTable';
import Login from '../../Authentication/Login';
import Typography from '@material-ui/core/Typography';

class JobManagement extends Component {
  state = {
    jobs: [],
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
    fetch('api/auth/getJobs', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    }).then(res => res.json())
      .then((json) => {
        json.map(v => v.isDisabled = true);
        this.setState({ jobs: json });
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
      const data = this.state.jobs;
      n[fieldName] = e.target.value;
      const index = data.indexOf(n);
      if (index !== null) {
        data[index] = n;
        this.setState({ jobs: data });
      }
      e.preventDefault();
    }

    handleSave = (n) => {
      const data = this.state.jobs;
      const index = data.indexOf(n);
      if (index !== -1) {
        data[index] = n;

        fetch('api/Auth/EditJob', {
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
            if (response.status === 200) {
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

    handleDeleteJob = (n, e) => {
      if (n !== '') {
        fetch(`api/auth/removeJob?Id=${n}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
        })
          .then((res) => {
            if (res.status === 200) {
              this.setState({ open: false });
              alert('Removed Job Successfully');
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
            <JobManagementTable
              data={this.state.jobs}
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

export default JobManagement;