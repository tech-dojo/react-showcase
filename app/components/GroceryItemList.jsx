"use strict";

let GroceryItem = require('./GroceryItem.jsx'),
	GroceryListAddItem = require('./GroceryListAddItem.jsx'),
	React = require('react/addons');

module.exports = React.createClass({

	render:function(){
		return (
			<div>
				{this.props.items.map((item,index)=>{
					return (
						<GroceryItem item={item} key={"item"+index} />
					)
				})}
				<GroceryListAddItem />
			</div>
		)
	}
})
