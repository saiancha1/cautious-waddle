import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home';
import Companies from './components/Companies';
import Consultants from './components/Consultants';
import Work from './components/Work';
import Events from './components/Events';
import Contact from './components/Contact';
import Subscribe from './components/Subscribe';
import Login from './components/NavBar/Login';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/companies" component={Companies} />
      <Route exact path="/consultants" component={Consultants} />
      <Route exact path="/work" component={Work} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/subscribe" component={Subscribe} />
    </div>
  </Router>
);

export default App;
