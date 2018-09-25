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
            this.setState({users:json});
        });
    };

  render() {
    return (
      <UserManagementTable data={this.state.users}/>

    );
  }
  

  getCompanies =  async () => {
     await fetch('api/Companies/getCompanies',{
      method: 'GET',
      headers: {
        'Authorization': 'Token' + localStorage.getItem('id_token'),

      }
    }).then(res => res.json())
    .then(json =>{
     return json;
    })
    };
  }

export default UserManagement;
