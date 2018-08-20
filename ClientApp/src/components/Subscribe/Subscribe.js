import React from 'react';
import "./Subscribe.css";
import Header from "../Header/Header.js"

const Subscribe = (props) => {
  const inputstyle = {
    margin: 'auto',

  };
  
  return <div> <Header title="Subscribe"/>
    <div className="subb"> 
    <br></br>
    <h2>Mailing List</h2>
    <br></br>
    <div className="tablesubb">
    <form action="insertpage server side" method="post" > 
    <table >
    <tr ><input type="checkbox" name="check1"></input> <td>Events</td></tr>
    <tr><input type="checkbox" name="check2"></input> <td>Meet-Ups</td></tr>
    <tr><input type="checkbox" name="check3"></input> <td>Jobs</td></tr>
    <tr><input type="checkbox" name="check4"></input> <td>Internships</td></tr>
    <tr><input type="checkbox" name="check5"></input> <td>Company News</td></tr>
    <br></br>
    <tr ><input type="email" name="emailfield" Style="width=1000px"/></tr>
    <br></br>
    <tr><input type="submit" name="subsubmit" style={inputstyle}/></tr>
    </table>
    </form>
    </div>
  </div>
  </div>
};

export default Subscribe;
