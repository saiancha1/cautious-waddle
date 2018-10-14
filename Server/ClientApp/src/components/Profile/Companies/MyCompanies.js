import React from 'react';
import CompanyList from '../../Companies/CompanyList';

const MyCompanies = props => (
  <div>
    <CompanyList companies={props.companies} />
  </div>
);
export default MyCompanies;
