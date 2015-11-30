import React from 'react';
import ShowCase from './ShowCase.jsx';
import ShowPiece from './ShowPiece.jsx';
import Signin from './Signin.jsx';
import About from './About.jsx';
import Header from './Header.jsx';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { Router, Route, IndexRoute } from 'react-router';
var history;
if (typeof(window) !== 'undefined'){
    history = createBrowserHistory();
}
else {
    history = createMemoryHistory(); //This kind of history is needed for server-side rendering.
}

export default (props) => {
  return (
 
  <Router history={history}>
    <Route path="/" component={Header}>
        <IndexRoute component={ShowCase}/>
      <Route path="signin" component={Signin} />
      <Route path="about" component={About} />
        <Route path="showpiece/:id" component={ShowPiece} />
    </Route>
  </Router>

    );
  }