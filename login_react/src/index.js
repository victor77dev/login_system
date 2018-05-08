import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import Layout from './components/layout/Layout';

import Home from './components/page/Home';
import Register from './components/page/Register';
import Login from './components/page/Login';
import Logout from './components/page/Logout';

import store from "./store"

import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(<Provider store={store}>
  <Router>
    <div>
      <Route path='/' component={Layout} />
      <Route exact path='/' component={Home} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
    </div>
  </Router>
</Provider>, document.getElementById('root')
);
