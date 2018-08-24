import React from 'react';
import "./Subscribe.css";
import Header from "../Header/Header.js"
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap'

const Subscribe = (props) => {
  
  return <div> <Header title="Subscribe"/>
    <div className="subb"> 
    <br></br>
    <h2>Mailing List</h2>
    <br></br>
    <div className="tablesubb">
    <form action="insertpage server side" method="post" > 
    <FormGroup controlId="formBasix" validationState={this.getValidationState()}>
    <table >
    <tr ><input type="checkbox" name="check1"></input> <td>Events</td></tr>
    <tr><input type="checkbox" name="check2"></input> <td>Meet-Ups</td></tr>
    <tr><input type="checkbox" name="check3"></input> <td>Jobs</td></tr>
    <tr><input type="checkbox" name="check4"></input> <td>Internships</td></tr>
    <tr><input type="checkbox" name="check5"></input> <td>Company News</td></tr>
    <br></br>
    <tr ><input type="email" name="emailfield" Style="width=100px"/></tr>
    <br></br>
    <tr><input type="submit" name="subsubmit" Style="margin-left:100px"/></tr>
    </table>
    </FormGroup>
    </form>
    </div>
  </div>
  </div>
};

export default Subscribe;
