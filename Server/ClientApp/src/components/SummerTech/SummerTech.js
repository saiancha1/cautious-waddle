import React, { Component } from 'react';
import './SummerTech.css';
import SimpleModalWrapped from './SimpleModal';

class SummerTech extends Component {
  state = {
    companies: [],
  };

  // TODO: Update media img to responsive sizing, complete More Info link, possibly remove Login button from header, restore the navbar and router code.

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then((json) => {
        this.setState({ companies: json });
      });
  }

  render() {
    return (
      <div className="summer">
        <div className="jumbotron text-center">
          <h1>Summer Of Tech</h1>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <ul>
                {this.state.companies.map(company => (
                  <li className="media">
                    <a className="pull-left" href="#">
                      <img className="media-object" src={company.logo} alt="company logo" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">{company.companyName}</h4>
                      <p>{company.companyDesc}</p>
                      <SimpleModalWrapped />
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
