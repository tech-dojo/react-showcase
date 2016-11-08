import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import ShowCase from './ShowCase.jsx';
import { Link } from 'react-router';
import auth from './../services/Authentication';

class Header extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state= {};
    this.router = context.router;
    this.state.loggedIn = auth.loggedIn();
    this.state.open = false;
    this._handleClick = this._handleClick.bind(this);
    this._menuClick = this._menuClick.bind(this);
    this.updateAuth = this.updateAuth.bind(this);
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  updateAuth(loggedIn) {
    this.setState({loggedIn: loggedIn});
    if(loggedIn){
      this.router.push('/');
    }
  }
  componentWillMount() {
    auth.onChange = this.updateAuth;
  }

  render(){
    let _title = "Showcase";
    return (
      <div id="page_container">
        <Drawer
          open={this.state.open}>
          <div
            className="menu_title"
            onClick={this._menuClick}>
            <FontIcon className="fa fa-paint-brush" color="#00bcd4"/>Menu</div>
          <Link
            to="/"
            className="menuLink"
            onClick={this._menuClick}>
            <MenuItem
              className="menuItem"
              index={0}>Showcase</MenuItem>
          </Link>
          <Link
            to="/about"
            className="menuLink"
            onClick={this._menuClick}>
            <MenuItem
              className="menuItem"
              index={1}>About</MenuItem>
          </Link>
          {!this.state.loggedIn ? (
            <Link
              to="/signin"
              className="menuLink"
              onClick={this._menuClick}>
              <MenuItem
                className="menuItem"
                index={2}>
                Sign In
              </MenuItem>
            </Link>
          ):(
            <Link
              to="/signout"
              className="menuLink"
              onClick={this._menuClick}>
              <MenuItem
                className="menuItem"
                index={2}>
                Sign Out
              </MenuItem>
            </Link>
          )}
          <Divider />
          <Subheader>Social</Subheader>

            <a
              href="https://github.com/tech-dojo"
              className="menuLink"
              target="_blank">
          <MenuItem
            index={4}
            className="menuLink">
            GitHub
            </MenuItem>
          </a>
          <a
            href="https://twitter.com/dojo_tech"
            className="menuLink"
            target="_blank">
        <MenuItem
          index={4}

          className="menuLink">
          Twitter
          </MenuItem>
        </a>
        </Drawer>


        <AppBar
          title={
            <Link to="/" className="header_title">
              <span className="main_title">
                {_title}
                <FontIcon className="fa fa-paint-brush"/>
              </span>
            </Link>
          }
          iconElementLeft={
            <IconButton
              onClick={ this._handleClick }>
              <FontIcon
                className="fa fa-reorder main_title"
                color="white"/>
            </IconButton>
          }>

          <a
            className="social_links"
            target="_blank"
            href="https://github.com/tech-dojo">
            <FontIcon
              className="fa fa-github"
              color="white"/>
          </a>
          <a
            className="social_links"
            target="_blank"
            href="https://twitter.com/dojo_tech">
            <FontIcon
              className="fa fa-twitter"
              color="white"/>
          </a>
        </AppBar>

        { this.props.children }
      </div>

    )
  }
  _handleClick(e) {
    e.preventDefault();

    this.setState({open: !this.state.open});
  }
  _menuClick(e) {
    console.log("tappef");
    this.setState({open: false});
  }
}
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};
Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Header;
