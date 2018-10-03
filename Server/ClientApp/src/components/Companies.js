import React, { Component } from 'react';
import CompanyList from './Companies/CompanyList';

class Companies extends Component {
  state = {
    companies: [],
  }

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
      });
  }

  render() {
    return (
      <CompanyList companies={this.state.companies} />

    );
  }


  getCompanies = async () => {
    await fetch('api/Companies/getCompanies', {
      method: 'GET',
      headers: {
        Authorization: `Token${localStorage.getItem('id_token')}`,

      },
    }).then(res => res.json())
      .then(json => json);
  };
}

export default Companies;
