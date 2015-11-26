"use strict";

let React = require('react'),
    AppBar = require('material-ui/lib/app-bar'),
    IconButton = require('material-ui/lib/icon-button'),
    FlatButton = require('material-ui/lib/flat-button'),
    MenuItem = require('material-ui/lib/menu/menu-item'),
    LeftNav = require('material-ui/lib/left-nav'),
    FontIcon = require('material-ui/lib/font-icon'),
    { Router, Route, Link } = require('react-router');

module.exports = React.createClass({
    _handleClick: function(e) {
    e.preventDefault();
 
    // Show/Hide the LeftMenu
    this.refs.leftNav.toggle();
  },

	render:function(){
        let menuItems = [
          { route: 'get-started', text: 'Showcase' },
          { route: 'customization', text: 'About' },
          { route: 'customization', text: 'Sign In' },
          { type: MenuItem.Types.SUBHEADER, text:'Social'},
          {
             type: MenuItem.Types.LINK,
             payload: 'https://github.com/callemall/material-ui',
             text: 'GitHub'
          },
            {
             type: MenuItem.Types.LINK,
             payload: 'https://github.com/callemall/material-ui',
             text: 'Twitter'
          },
        ],
        _title = "Showcase";
		return (
            <div id="page_container">
			 <LeftNav ref="leftNav" docked={false} menuItems={menuItems} header={<div className="menu_title"><FontIcon className="fa fa-paint-brush" color="#00bcd4"/>Menu</div>}/>
				<AppBar
                  title={<span className="main_title">{_title} <FontIcon className="fa fa-paint-brush"/></span>}
                onLeftIconButtonTouchTap={this._handleClick}>
                <a className="social_links" target="_blank" href="https://github.com/callemall/material-ui"><FontIcon
        className="fa fa-github"
        color="white"/></a>
            <a className="social_links" target="_blank" href="https://github.com/callemall/material-ui"><FontIcon
        className="fa fa-twitter"
        color="white"/></a>
            </AppBar>
               
              </div>                     

		)
	}
})
