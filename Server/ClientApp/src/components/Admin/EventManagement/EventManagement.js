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
import EventManagementTable from './EventManagementTable';
import Login from '../../Authentication/Login';
import Typography from '@material-ui/core/Typography';

class EventManagement extends Component {
  state = {
    events: [],
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
    fetch('api/events/adminGetEvents', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    }).then(res => res.json())
      .then((json) => {
        json.map(v => v.isDisabled = true);
        console.log(json);

        this.setState({ events: json });
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
      const data = this.state.events;
      n[fieldName] = e.target.value;
      const index = data.indexOf(n);
      if (index !== null) {
        data[index] = n;
        this.setState({ events: data });
      }
      e.preventDefault();
    }

    handleSave = (n) => {
      const data = this.state.events;
      const index = data.indexOf(n);
      if (index !== -1) {
        data[index] = n;

        fetch('api/events/editEvent', {
          method: 'POST',

          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          },
          body: JSON.stringify(n),
        })
          .then(res => res.json())
          .then((response) => {
            this.setState({ events: data });
            if (response.status === 200) {
              alert('Done');
            } else {
              alert('Not Done');
            }
          })
          .catch(() => { alert('Failed To Update'); });
      }
    }
    handleIsApproved = (n,e,val) => {
       if (e.target.checked === true)
       {
        const data = this.state.events;
        const index = data.indexOf(n);
        fetch('api/events/approveEvent', {
          method: 'POST',

          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          },
          body: n.eventId,
        })
          .then((res) => {
            if (res.status === 200) {
              n.isApproved = 1;
              n.isDisabled = true;
              data[index] = n;
              this.setState({events:data});
            } else {
              alert('Not Done');
            }
          })
          .catch(() => { alert('Failed To Update'); });
      }
      else 
      {
        const data = this.state.events;
        const index = data.indexOf(n);
        fetch('api/events/disapproveEvent', {
          method: 'POST',

          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          },
          body: n.eventId,
        })
          .then((res) => {
            if (res.status === 200) {
              n.isApproved = 0;
              n.isDisabled = true;
              data[index] = n;
              this.setState({events:data});
            } else {
              alert('Not Done');
            }
          })
          .catch(() => { alert('Failed To Update'); });
      }
      e.preventDefault();

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
        fetch(`api/events/removeEvent?Id=${n}`, {
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
            <EventManagementTable
              data={this.state.events}
              handleEdit={this.handleEdit}
              handleSave={this.handleSave}
              handleChange={this.handleChange}
              handleDelete={this.handleDelete}
              handleIsApproved={this.handleIsApproved}
            />
          </div>
        );
      } else {
        return (
          <div>No Access</div>
        );
      }
    }
}

export default EventManagement;
