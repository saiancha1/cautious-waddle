import React, { Component } from 'react';
import CompanyList from './Companies/CompanyList';
import CompanyView from './Companies/CompanyView';
import CompanyFilter from './Companies/CompanyFilter';
import AddCompany from './Companies/AddCompany';
import Spinner from './Spinner';
import CompanyPage from './Companies/CompanyPage';

class Companies extends Component {
  state = {
    companies: [],
    selectedCompany: null,
    companyOpen: false,
    filter: 'All',
    menuItems: [],
    originalCompanies: [],
    AddCompany: null,
    isLoaded: false,
  }

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
        // console.log('Company List');
        // console.log(this.state.companies);
        this.setState({ originalCompanies: this.state.companies });
        const menuItems1 = [...new Set(this.state.companies.map(item => item.businessType))];
        this.setState({ menuItems: menuItems1 });
        // console.log('Menu Items');
        // console.log(this.state.menuItems);
        this.setState({ isLoaded: true });
        // console.log(this.state);
      });
  }

  createMarkup = htmlData => ({ __html: htmlData })

  handleModalOpen = (company, e) => {
    this.setState({ selectedCompany: company });
    this.setState({ companyOpen: true });
    e.preventDefault();
  }

  handleClose = () => {
    this.setState({ selectedCompany: null });
    this.setState({ companyOpen: false });
  }

  handleFilterChange = (e) => {
    const val = e.target.value;
    this.setState({ filter: val });
    if (val !== 'All') {
      const newArr = this.state.originalCompanies.filter(company => company.businessType == e.target.value);
      this.setState({ companies: newArr });
    } else {
      fetch('api/Companies/getCompanies').then(res => res.json())
        .then((json) => {
          this.setState({ companies: json });
          // console.log(this.state);
        });
    }
  }

  handleSearchBarChange = (e) => {
    let val = e.target.value;
    if(val !== "")
    {
      val = val.toLowerCase();
      const companies = this.state.companies;
      const filteredCompanies = companies.filter(c => (c.companyName.toLowerCase().includes(val) || 
      c.companyDesc.toLowerCase().includes(val) ||
      c.businessType.toLowerCase().includes(val) ||
      c.suburb.toLowerCase().includes(val) ||
      c.specialistArea.toLowerCase().includes(val)||
      c.website.toLowerCase().includes(val)));
      this.setState({companies:filteredCompanies});
    }
    else {
      fetch('api/Companies/getCompanies').then(res => res.json())
        .then((json) => {
          this.setState({ companies: json });
          // console.log(this.state);
        });
    }
  }
  handleFormDataChange = (fieldName, e) => {
    e.target.preventDefault();
    const val = e.target.value;
    const company = this.state.AddCompany;
    // if (fieldName === 'h1') {

    // }
  }

  editCompany = (e) => {
    this.setState({ editCompany: e });
  };

  hideComponent = (e) => {
    this.setState({ editCompany: undefined });
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

  render() {
    if (!this.state.isLoaded) {
      return (
        <Spinner />
      );
    }
    let company;
    let selectedCompany;
    const addCompany = (this.state.editCompany) ? <AddCompany company={this.state.editCompany} hide={this.hideComponent} /> : null;

    if (this.state.selectedCompany !== null) {
      selectedCompany = this.state.selectedCompany;

    }
    if(this.state.selectedCompany == null)
    {
    return (
      <div>
        <CompanyFilter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
          filterItems={this.state.menuItems}
          handleSearchBarChange = {this.handleSearchBarChange}
        />
        <CompanyList
          companies={this.state.companies}
          handleModalOpen={this.handleModalOpen}
          generateDesc={this.createMarkup}
          editCompany={this.editCompany}
        />
        {company}
        {addCompany}

      </div>
    );
    }
    if(this.state.selectedCompany) {
      return (
        <div>
        <CompanyPage company = {selectedCompany} generateDesc = {this.createMarkup(selectedCompany.companyDesc)}/>
        </div>
      )
    }
  }
}

export default Companies;
