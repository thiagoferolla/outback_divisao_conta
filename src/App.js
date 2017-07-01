import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Inicio from './pages/inicio';
import Page0 from './pages/page0'; 
import Page1 from './pages/page1';
import Page11 from './pages/page11';
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import Page4 from  './pages/page4';
import NewPageAdd from './pages/new_pageadd'; 
import ProductPage from './pages/product_page';

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
            <Route path='/:tableId/0' component={Page0}/>
            <Route path='/:tableId/11' component={Page11}/>
            <Route path='/:tableId/1' component={Page1}/>
            <Route path='/:tableId/2' component={Page2}/>
            <Route path='/:tableId/3' component={Page3}/>
            <Route path='/:tableId/4' component={Page4}/>
            <Route exact path='/:tableId/add/:name' component={NewPageAdd}/>
            <Route exact path='/:tableId/add/:name/:category' component={ProductPage}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
