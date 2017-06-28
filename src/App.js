import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Inicio from './pages/inicio';
import Page0 from './pages/page0'; 
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import PageAdd from './pages/pageadd';

injectTapEventPlugin();

var config = {
  apiKey: "AIzaSyCwgUMNonGS7PM_dn5bOoMgYbbUpbk12rw",
  authDomain: "order-81eaa.firebaseapp.com",
  databaseURL: "https://order-81eaa.firebaseio.com",
  projectId: "order-81eaa",
  storageBucket: "",
  messagingSenderId: "593093776588"
};

firebase.initializeApp(config)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path='/' component={Inicio}/>
            <Route exact path='/:tableId/' component={Page1}/>
            <Route path='/:tableId/0' component={Page0}/>
            <Route path='/:tableId/1' component={Page1}/>
            <Route path='/:tableId/2' component={Page2}/>
            <Route path='/:tableId/3' component={Page3}/>
            <Route path='/:tableId/add/:name' component={PageAdd}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
