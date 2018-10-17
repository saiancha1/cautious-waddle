import React from 'react';
import CompanyList from '../../Companies/CompanyList';
import AddCompany from '../../Companies/AddCompany';

const editCompany = (company, e) => {
  e.preventDefault();
  return (
    <AddCompany company={company} />
  );
};

const MyCompanies = (props) => {
  let addCompany;
  return (
    <div>
      <CompanyList companies={props.companies} editCompany={e => props.editCompany(e)} />
      {addCompany}
    </div>

  );
};
export default MyCompanies;
