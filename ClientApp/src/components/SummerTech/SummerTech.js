import React from 'react';
import "./SummerTech.css";
import Header from "../Header/Header.js"
import Footer from "../Footer/Footer.js"

const SummerTech = (props) => {
  
  return ( <div><Header title="Summer Of Tech"/>
    <div class="jumbotron text-center">
  <h1>Summer Of Tech</h1>
  <p>Lorem ipsum dolor sit amet..</p>
</div>
  
<div class="container-fluid">
 <div class="row">
    <div class="col-sm-3">
      <h4></h4>
    </div>
    <div class="col-sm-6">
     <ul class = "media-list">
   <li class = "media">
      <a class = "pull-left" href = "#">
         <img class = "media-object" src = "/bootstrap/images/64.jpg" alt = "company Logo" />
      </a>
      
      <div class = "media-body">
         <h4 class = "media-heading">Company Name</h4>
			     <p>
            This is text that describes the company. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
          <a href="">More Info</a>
          </div>
        </li>
     
        <li class = "media">
      <a class = "pull-left" href = "#">
         <img class = "media-object" src = "/bootstrap/images/64.jpg" alt = "company Logo" />
      </a>
      
      <div class = "media-body">
         <h4 class = "media-heading">Company Name</h4>
			     <p>
            This is text that describes the company. Lorem ipsum dolor sit amet, consectetur        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
          <a href="">More Info</a>
          </div>
        </li>
      </ul>
      </div>
    <div class="col-sm-3">
      <h4></h4>
    </div>
  </div>
  <br/><br/><br/><br/>
</div>
</div>
)};

export default SummerTech;
