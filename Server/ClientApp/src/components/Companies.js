import React, { Component } from 'react';
import CompanyList from './Companies/CompanyList';
<<<<<<< HEAD

=======
import CompanyView from './Companies/CompanyView';
>>>>>>> master
class Companies extends Component {
  state = {
    companies: [],
    selectedCompany:null,
    companyOpen:false,
  }

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
<<<<<<< HEAD
      .then((json) => {
        this.setState({ companies: json });
      });
  }

=======
    .then(json =>{
      this.setState({companies:json});
    })
  
    };
  handleModalOpen = (company,e) => {
    
    this.setState({selectedCompany:company})
    this.setState({companyOpen:true})
    e.preventDefault();
  }
  handleClose = () => {
    this.setState({selectedCompany:null});
    this.setState({companyOpen:false})
  }
>>>>>>> master
  render() {
   let company;
   if(this.state.selectedCompany !== null)
   {
     const selectedCompany = this.state.selectedCompany;
    company =<CompanyView companyToRender={selectedCompany} handleClose={this.handleClose} companyOpen={this.state.companyOpen}/> ;
    
   }
    return (
<<<<<<< HEAD
      <CompanyList companies={this.state.companies} />

=======
      <div>
        
        <CompanyList companies={this.state.companies} handleModalOpen={this.handleModalOpen}/>
        {company}
      
      </div>
>>>>>>> master
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
