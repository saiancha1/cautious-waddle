import React from 'react';
import "./Subscribe.css";
import Header from "../Header/Header.js"

const Subscribe = (props) => {
  
  return <div> <Header title="Subscribe"/>
    <div className="subb"> 
    <h1>SUBSCRIBE</h1>
    <br></br>
    <h2>Mailing List</h2>
    <br></br>
    <form action="insertpage server side" method="post"> 
    <input type="checkbox" name="check1"></input> Events<br></br>
    <input type="checkbox" name="check2"></input> Meet-Ups<br></br>
    <input type="checkbox" name="check3"></input> Jobs<br></br>
    <input type="checkbox" name="check4"></input> Internships<br></br>
    <input type="checkbox" name="check5"></input> Company News<br></br>
    <br></br>
    <input type="email" name="emailfield"/>
    <br></br>
    <br></br>
    <input type="submit" name="subsubmit"/>
    </form>
  </div>
  </div>
};

export default Subscribe;
