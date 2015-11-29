import React from 'react';
import ShowCase from './ShowCase.jsx';
import ShowPiece from './ShowPiece.jsx';
import Signin from './Signin.jsx';
import About from './About.jsx';
import Header from './Header.jsx';
import { Router, Route, IndexRoute } from 'react-router';

export default (props) => {
  return (
      
  <Router>
    <Route path="/" component={Header}>
        <IndexRoute component={ShowCase} pieces={props.pieces}/>
      <Route path="signin" component={Signin} />
      <Route path="about" component={About} />
        <Route path="showpiece/:id" component={ShowPiece} />
    </Route>
  </Router>

    );
  }