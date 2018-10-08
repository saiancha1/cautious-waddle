import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Job from '../components/Jobs/Job'

class Jobs extends Component {
  state = {
    jobs: [],
  }
  // Fetching consultants info from API pre-mounting

  async componentWillMount() {
    try {
      const res = await fetch('api/Jobs/getJobs');
      const rawjoblist = await res.json();
      console.log(rawjoblist);
      this.setState({
        jobs: rawjoblist,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <div>
          <h1>Jobs</h1>
          <Job rawlist={this.state.jobs}/>
          <Link to="/addjobs">
          <button>Add Job</button>
          </Link>
        </div>
    );
  }

}

export default Jobs;
