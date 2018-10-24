import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import './SummerTech.css';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
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
    fetch('api/Companies/getSummerInternships').then(res => res.json())
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
        <div className="sot">
          <div className="sotImg">
            <div className="mycontainer" >
              <h1>Summer of Tech </h1>
              <h3>Want to be part of New Zealand’s premier IT internship programme?</h3>
              <br/>
                <Grid container sm={12}>
                  <Grid item sm={11}>
              With a firm belief in the importance of the next generation of IT talent, the Summer Of Tech programme connects employers with top local students for paid work experience and graduate jobs. 
              If you want to participate then look no further than the local companies that are listed below, they all offer summer work or internships. 
              For more information on the programme visit <a href="http://www.summeroftech.co.nz">www.summeroftech.co.nz</a>
                  </Grid>
                </Grid>
            </div>
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
                      <p id="pp" dangerouslySetInnerHTML ={this.createMarkup(company.companyDesc)}></p>
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
