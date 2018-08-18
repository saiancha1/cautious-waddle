import React from 'react';

const Subscribe = () => (
  <div>
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
    <input type="submit" name="subsubmit"/>
    </form>
  </div>
);

export default Subscribe;
