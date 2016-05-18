import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import Home from './Home.react.js';
import App from './App';

import '../styles/styles.scss';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/books" component={App} />
    <Route path="/books/:bookId" component={App} />
  </Router>
), document.getElementById('root'));
