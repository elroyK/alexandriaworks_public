import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import Search from './components/Search';
import App from './components/App';
import Favorites from './components/Favorites';

/*
Routes
*/

var routes = (
    <Router history={createHistory()}>
        <Route path="/" component={Search}/>
        <Route path="/app" component={App}/>
        <Route path="/fav" component={Favorites}/>
        <Route path="*" component={NotFound}/>
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
