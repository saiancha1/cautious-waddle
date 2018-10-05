import React from 'react';
import './Subscribe.css';

const Subscribe = props => (
  <div>
    {' '}
    <div className="subb">
      <br />
      <h2>Mailing List</h2>
      <br />
      <div className="tablesubb">
        <form action="insertpage server side" method="post">
          <table>
            <tr>
              <input type="checkbox" name="check1" />
              {' '}
              <td>Events</td>
            </tr>
            <tr>
              <input type="checkbox" name="check2" />
              {' '}
              <td>Meet-Ups</td>
            </tr>
            <tr>
              <input type="checkbox" name="check3" />
              {' '}
              <td>Jobs</td>
            </tr>
            <tr>
              <input type="checkbox" name="check4" />
              {' '}
              <td>Internships</td>
            </tr>
            <tr>
              <input type="checkbox" name="check5" />
              {' '}
              <td>Company News</td>
            </tr>
            <br />
            <tr><input type="email" name="emailfield" Style="width=100px" /></tr>
            <br />
            <tr><input type="submit" name="subsubmit" Style="margin-left:100px" /></tr>
          </table>
        </form>
      </div>
    </div>
  </div>
);

export default Subscribe;
