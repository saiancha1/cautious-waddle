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
            this.setState({users:json});
        })
        .catch(function(error) {alert("Not logged in!")});
    };
    handleEdit = (data) => {
      this.setState({users:data});
    }
  render() {
    return (
      <UserManagementTable data={this.state.users} handleEdit={this.handleEdit}/>

    );
  }
  }

export default UserManagement;
