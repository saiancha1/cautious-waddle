import React, { Component } from 'react';
import "./SummerTech.css";
import Header from "../Header/Header.js"
import axios from 'axios';

class SummerTech extends Component {
  state = {
    companies: []
  }

  componentDidMount() {
    axios.get(`https://capstone1.azurewebsites.net/api/companies/getCompanies`)
        .then(res => {
          const companies = res.data;
          this.setState({ companies });
        })
    }


render(){
  return (
        <div className="summer"> 

        <div className="jumbotron text-center">
          <input className="pull-left" type="button" value="Login" onclick="msg()"/> 
          <h1>Summer Of Tech</h1>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
            </div>

          <div className="col-sm-6">
           
            <ul>
                {this.state.companies.map(company => <li>{company.companyName}</li>)}
             
            </ul>
      </div>          
    </div>
  </div>
</div>)
}
}
  export default SummerTech;