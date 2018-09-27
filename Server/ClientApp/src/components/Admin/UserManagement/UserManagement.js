import React, { Component } from 'react';
import UserManagementTable from './UserManagementTable';
import AuthService from '../../Authentication/AuthService';
import Login from '../../Authentication/Login';
class UserManagement extends Component {
  
  state = {
    users: [],
    view: "ViewUsers",
    isAdmin: false
  }
  

  async componentWillMount() {
    fetch('api/auth/isAdmin',{
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
    })
    .then ((res) => {
      if (res.status === 200)
      {
        this.setState({isAdmin:true})
      }
    });
    fetch('api/auth/getUsers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    }).then(res => res.json())
      .then((json) => {
        json.map(v => v.isDisabled = true);
        this.setState({ users: json });
      })
      .catch(() => { this.setState({isAdmin:false}) });
  }

    handleEdit = (data) => {
      this.setState({ users: data });
    }

    handleChange = (n, e, fieldName) => {
      fetch('api/auth/isAdmin',{
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
      })
      .then ((res) => {
        if (res.status === 200)
        {
          this.setState({isAdmin:true})
        }
        else{
          this.setState({isAdmin:false})
        }
      });
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
      if(this.state.isAdmin === true)
      {
      return (
        
        <UserManagementTable data={this.state.users} 
        handleEdit={this.handleEdit} handleSave={this.handleSave} 
        handleChange={this.handleChange}/>
        

      );
      }
      else{
        return (
       <div>No Access</div>
        )
      }
    }
}

export default UserManagement;
