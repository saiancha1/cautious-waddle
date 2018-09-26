import React, { Component } from 'react';
import UserManagementTable from './UserManagementTable';

class UserManagement extends Component {
  state = {
    users: [],
  }

  async componentWillMount() {
    fetch('api/auth/getUsers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    }).then(res => res.json())
      .then((json) => {
        json.map(v => v.isDisabled = true);
        this.setState({ users: json });
      })
      .catch(() => { alert('Not logged in!'); });
  }

    handleEdit = (data) => {
      this.setState({ users: data });
    }

    handleChange = (n, e, fieldName) => {
      const data = this.state.users;
      n[fieldName] = e.target.value;
      var index = data.indexOf(n);
      if(index !== null)
      {
        data[index] = n;
        this.setState({users:data});
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
            if (response.result === "User Added Successfully") {
              alert('Done');
            } else {
              alert('Not Done');
            }
          })
          .catch(() => { alert('Failed To Update'); });
      }
    }

    render() {
      return (
        <UserManagementTable data={this.state.users} 
        handleEdit={this.handleEdit} handleSave={this.handleSave} 
        handleChange={this.handleChange}/>

      );
    }
}

export default UserManagement;
