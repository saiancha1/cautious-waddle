import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/Home';
import Companies from './components/Companies';
import Consultants from './components/Consultants';
import Work from './components/Work';
import Events from './components/Events';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import SummerTech from './components/SummerTech/SummerTech';
import AdminComponent from './components/Admin/AdminComponent';
import Login from './components/Authentication/Login';
import AddJob from './components/AddJob/AddJob';
import logo from './images/logoV2.png';
import Header from './components/Header/Header';
import ConForm from './components/Consultants/ConForm';
import SubForm from './components/Subscribe/SubscribeForm';
import TestPost from './components/Consultants/TestPost';
import AddCompany from './components/Companies/AddCompany';


// Changed this simple function into a class so that we can manipulate state on this page
class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-root">
          <div className="main-content">
            <Header />
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/consultants" component={Consultants} />
            <Route exact path="/work" component={Work} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/summerTech" component={SummerTech} />
            <Route exact path="/admin" component={AdminComponent} />
<<<<<<< HEAD
            <Route exact path="/addconsultant" component={TestPost} />
            <Route exact path="/addCompany" component={AddCompany} />
=======
            <Route exact path="/addconsultant" component={ConForm} />
>>>>>>> master
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
