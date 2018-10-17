import React, { Component } from 'react';
import CompanyList from './Companies/CompanyList';
import CompanyView from './Companies/CompanyView';
import CompanyFilter from './Companies/CompanyFilter';
import AddCompany from './Companies/AddCompany';
import Spinner from './Spinner';
class Companies extends Component {
  state = {
    companies: [],
    selectedCompany: null,
    companyOpen: false,
    filter: 'All',
    menuItems:[],
    originalCompanies:[],
    AddCompany: null,
    isLoaded:false,
  }

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
        console.log('Company List');
        console.log(this.state.companies);
        this.setState({originalCompanies:this.state.companies});
        const menuItems1 = [...new Set(this.state.companies.map(item => item.businessType))]
        this.setState({menuItems:menuItems1});
        console.log('Menu Items');
console.log(this.state.menuItems);
        this.setState({isLoaded:true});
        console.log(this.state);

      });
      
  }

  createMarkup = (htmlData) => {
    return {__html: htmlData};
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

  handleFilterChange = (e) => {
    const val = e.target.value;
    this.setState({filter:val});
    if(val !== 'All')
    {
    let newArr = this.state.originalCompanies.filter(company => company.businessType == e.target.value);
    this.setState({companies:newArr});
    }
    else {
      fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
        console.log(this.state);
      });
    }
    
  }

  handleFormDataChange = (fieldName,e) => {
    e.target.preventDefault();
    const val = e.target.value;
    let company = this.state.AddCompany;
    if (fieldName === "h1")
    {
      
    }
  }
  editCompany = (e) => {
    this.setState({editCompany:e})
  };
  hideComponent = (e) => {
    this.setState({editCompany:undefined});
  }
  render() {
    if(!this.state.isLoaded)
    {
      return (
        <Spinner/>
      )
    }
    let company;
    const addCompany = (this.state.editCompany) ?  <AddCompany company={this.state.editCompany} hide={this.hideComponent} /> : null;

    if (this.state.selectedCompany !== null) {
      const selectedCompany = this.state.selectedCompany;
      company = <CompanyView companyToRender={selectedCompany} handleClose={this.handleClose} companyOpen={this.state.companyOpen}
      generateDesc= {this.createMarkup(selectedCompany.companyDesc)} />;
    }
    return (
      <div>
        <CompanyFilter filter={this.state.filter} 
        handleFilterChange={this.handleFilterChange}
        filterItems = {this.state.menuItems}/>
        <CompanyList companies={this.state.companies} handleModalOpen={this.handleModalOpen} generateDesc={this.createMarkup}
        editCompany= {this.editCompany}/>
        {company}
        {addCompany}

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
