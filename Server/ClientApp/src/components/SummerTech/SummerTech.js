import React, { Component } from 'react';
import './SummerTech.css';
import CompanyModal from './CompanyModal';
import '../Companies/companyStyles.css';
import background from '../../images/homepage-image.jpg';
import CompanyView from '../Companies/CompanyView';
class SummerTech extends Component {
  state = {
    companies: [],
    companyOpen:false,
    selectedCompany: null
  };

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
      });
  }
  createMarkup = (htmlData) => {
    return {__html: htmlData};
  }
  handleClose = () => {
    this.setState({ selectedCompany: null });
    this.setState({ companyOpen: false });
  }

  render() {
    return (
      <div>
        <div className="home-container">
          <img className="background-image" src={background} alt="background" />
          <div className="centered-text">
            <h3>
              <span>Summer of Tech</span>
              <br />
              Companies that often have summer work available
            </h3>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
            <p> </p>
            <p> </p>
              <ul>
                {this.state.companies.map(company => (
                  <li className="media">
                    <a className="pull-left" href="#">
                      <img className="media-object" src={company.logo} alt="company logo" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">{company.companyName}</h4>
                      <p dangerouslySetInnerHTML ={this.createMarkup(company.companyDesc)}></p>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>);
  }
}
export default SummerTech;
