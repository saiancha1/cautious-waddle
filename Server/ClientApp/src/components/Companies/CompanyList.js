import React from 'react';
import Company from './Company';
import AuthService from '../Authentication/AuthService';

const createMarkup = htmlData => ({ __html: htmlData });
const userCanEdit = (company) => {
  const authService = new AuthService();
  const token = authService.getProfile();
  const userId = token.id;
  for (let i = 0; i < company.users.length; i++) {
    if(company.users[i].id == userId)
    {
      return true;
    }
  // Do something
  }
};
const CompanyList = (props) => {
  const companies = props.companies.map(company => (
    <Company
      companyName={company.companyName}
      companyDescription={company.companyDesc}
      companyLogo={company.logo}
      handleModalOpen={e => props.handleModalOpen(company, e)}
      generateDesc={createMarkup(company.companyDesc)}
      canEdit={userCanEdit(company)}
      editCompany={e => props.editCompany(company,e)}
    />
  ));
  return (
    <div className="row">
      {companies}
      

    </div>
  );
};
export default CompanyList;
