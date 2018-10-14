import React from 'react';
import Company from './Company';

const createMarkup = htmlData => ({ __html: htmlData });

const CompanyList = (props) => {
  const companies = props.companies.map(company => (
    <Company
      companyName={company.companyName}
      companyDescription={company.companyDesc}
      companyLogo={company.logo}
      handleModalOpen={e => props.handleModalOpen(company, e)}
      generateDesc={createMarkup(company.companyDesc)}
/>
  ));
  return (
    <div className="row">
      {companies}
    </div>
  );
};
export default CompanyList;
