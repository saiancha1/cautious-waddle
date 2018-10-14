import React from 'react';
import Company from './Company';
const CompanyList = (props) => {
  const companies = props.companies.map((company) => 
    <Company companyName={company.companyName} companyDescription={company.companyDesc} 
        companyLogo={company.logo} handleModalOpen={(e) => props.handleModalOpen(company, e)}
        generateDesc={props.generateDesc(company.companyDesc)}/>
  );
  return (
      <div className="row">
      {companies}
      </div>
  );
};
export default CompanyList;
