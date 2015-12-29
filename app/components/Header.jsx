
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import MenuItem from 'material-ui/lib/menu/menu-item';
import LinkMenuItem from 'material-ui/lib/menu/link-menu-item';
import SubheaderMenuItem from 'material-ui/lib/menu/subheader-menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import FontIcon from 'material-ui/lib/font-icon';
import ShowCase from './ShowCase.jsx';
import { Link } from 'react-router';
import auth from './../services/Authentication';

class Header extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state= {};
        this.state.loggedIn = auth.loggedIn();
        console.log(this.state.loggedIn);
        this._handleClick = this._handleClick.bind(this);
        this._menuClick = this._menuClick.bind(this);
        this.updateAuth = this.updateAuth.bind(this);
    }
    updateAuth(loggedIn) {
      this.setState({loggedIn: loggedIn});
    }
    componentWillMount() {
      auth.onChange = this.updateAuth;
    }

	render(){
        let _title = "Showcase";
		return (
            <div id="page_container">

			 <LeftNav
                ref="leftNav"
                docked={false}
                header={<div className="menu_title">        <FontIcon className="fa fa-paint-brush" color="#00bcd4"/>Menu</div>}>
            <Link to="/" className="menuLink"><MenuItem className="menuItem" onTouchTap={this._menuClick} index={0}>Showcase</MenuItem></Link>
            <Link to="/about" className="menuLink"><MenuItem className="menuItem" onTouchTap={this._menuClick} index={1}>About</MenuItem></Link>
            {!this.state.loggedIn ? (<Link to="/signin" className="menuLink"><MenuItem className="menuItem" onTouchTap={this._menuClick} index={2}>Sign In</MenuItem></Link>):(<Link to="/signout" className="menuLink"><MenuItem className="menuItem" onTouchTap={this._menuClick} index={2}>Sign Out</MenuItem></Link>)}
            <div className="menuSubheader"><SubheaderMenuItem
              index={3}
              text='Social'
            /></div>
            <LinkMenuItem
              index={4}
              text='GitHub'
              payload="https://github.com/tech-dojo"
              target="_blank"
            className="menuLink"
            />
            <LinkMenuItem
              index={4}
              text='Twitter'
              payload="https://twitter.com/dojo_tech"
              target="_blank"
                className="menuLink"
            />

            </LeftNav>
				<AppBar
                  title={<Link to="/" className="header_title"><span className="main_title">{_title} <FontIcon className="fa fa-paint-brush"/></span></Link>}
                onLeftIconButtonTouchTap={this._handleClick}>
                <a className="social_links" target="_blank" href="https://github.com/tech-dojo">    <FontIcon
        className="fa fa-github"
        color="white"/></a>
            <a className="social_links" target="_blank" href="https://twitter.com/dojo_tech"><FontIcon
        className="fa fa-twitter"
        color="white"/></a>
            </AppBar>

            { this.props.children }
              </div>

		)
	}
    _handleClick(e) {
    e.preventDefault();

    this.refs.leftNav.toggle();
  }
    _menuClick(e) {

 console.log(this.refs.leftNav);
    this.refs.leftNav.close();
  }
}

export default Header;
