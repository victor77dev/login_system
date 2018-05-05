import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/layout/Layout';

import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import Logout from './page/Logout';

import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route path='/' component={Layout} />
      <Route exact path='/' component={Home} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
    </div>
  </Router>
  , document.getElementById('root')
);
