import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home';
import Companies from './components/Companies';
import Consultants from './components/Consultants';
import Work from './components/Work';
import Events from './components/Events';
import Contact from './components/Contact';
import Subscribe from './components/Subscribe/Subscribe';
import Login from './components/Login';
import Header from './components/Header/Header'

// Changed this simple function into a class so that we can manipulate state on this page
class App extends Component {
  // This is one example of how state could be used, to have different header names
  state = {
    pageName: "HOME - Test Header",
  }
// This function is meant to change state ie. page name to be rendered in header component
  pageNameHandler = (newname) => {
    this.setState({
      pageName: newname,
    })
  }

  render() {
    return <Router>
    <div>
      <Navbar />
{/* // Added header component to be separate and replicable*/}
      <Header title={this.state.pageName}/>
      <Route exact path="/" component={Home} 
      />
      <Route exact path="/companies" component={Companies} 
      // Currently trying to make this work - changing state on routing event (to display new header name)
      currentname={() => this.pageNameHandler('COMPANIES')}/>
      <Route exact path="/consultants" component={Consultants} 
      />
      <Route exact path="/work" component={Work} 
      />
      <Route exact path="/events" component={Events} 
      />
      <Route exact path="/contact" component={Contact} 
      />
      <Route exact path="/subscribe" component={Subscribe} 
      />
      <Route exact path="/login" component={Login} 
      />
    </div>
  </Router>
  }
}
// ORIGINAL SIMPLE FUNCTION BELOW
// const App = () => (
//   <Router>
//     <div>
//       <Navbar />
//       <Header title={Route.num}/>
//       <Route exact path="/" component={Home} num="1"/>
//       <Route exact path="/companies" component={Companies} num="2"/>
//       <Route exact path="/consultants" component={Consultants} />
//       <Route exact path="/work" component={Work} />
//       <Route exact path="/events" component={Events} />
//       <Route exact path="/contact" component={Contact} />
//       <Route exact path="/subscribe" component={Subscribe} />
//       <Route exact path="/login" component={Login} />
//     </div>
//   </Router>
// );

export default App;
