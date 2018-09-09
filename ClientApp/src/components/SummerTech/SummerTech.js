import React, { Component } from 'react';
import './SummerTech.css';

class SummerTech extends Component {
  state = {
    companies: [],
  };

//TODO: Update media img to responsive sizing, complete More Info link, possibly remove Login button from header, restore the navbar and router code.

  async componentWillMount() {
    fetch('api/Companies/getCompanies').then(res => res.json())
      .then(json => {
        this.setState({ companies: json });
    });
  }
  render() {
    return (
        <div className="summer">
        <div className="jumbotron text-center">
          <input className="pull-left" type="button" value="Login" onClick="msg()" />
          <h1>Summer Of Tech</h1>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
          <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3"/>
          <div className="col-sm-6">
            <ul>
              {this.state.companies.map(company =>  <li class = "media">
                <a class = "pull-left" href = "#">
                  <img class = "media-object" src={company.logo} alt='company logo' ></img>
                </a>
                <div class = "media-body">
                  <h4 class = "media-heading">{company.companyName}</h4>
                    <p>{company.companyDesc}</p>
                    <a href="">More Info</a>
                </div>
              </li>)}
            </ul>
            </div>
    </div>
  </div>
</div>);
}
}
  export default SummerTech;
