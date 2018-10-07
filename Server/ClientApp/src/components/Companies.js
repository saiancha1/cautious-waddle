import React, { Component } from 'react';
import CompanyList from './Companies/CompanyList';
import CompanyView from './Companies/CompanyView';

class Companies extends Component {
  state = {
    companies: [],
    selectedCompany: null,
    companyOpen: false,
  }

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
        console.log(this.state);
      });
  }

  handleModalOpen = (company, e) => {
    this.setState({ selectedCompany: company });
    this.setState({ companyOpen: true });
    e.preventDefault();
  }

  handleClose = () => {
    this.setState({ selectedCompany: null });
    this.setState({ companyOpen: false });
  }

  render() {
    let company;
    if (this.state.selectedCompany !== null) {
      const selectedCompany = this.state.selectedCompany;
      company = <CompanyView companyToRender={selectedCompany} handleClose={this.handleClose} companyOpen={this.state.companyOpen} />;
    }
    return (
      <div>

        <CompanyList companies={this.state.companies} handleModalOpen={this.handleModalOpen} />
        {company}

      </div>
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
