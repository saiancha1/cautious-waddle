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
  

  render() {
    return <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} 
      />
      <Route exact path="/companies" component={Companies} 
      />
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

export default App;
