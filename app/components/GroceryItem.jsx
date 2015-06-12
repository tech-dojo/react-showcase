var dispatcher = require("./../dispatcher.js");
var groceryAction = require("./../stores/GroceryItemActionCreator.jsx");
var React = require('react/addons');
var cx = React.addons.classSet;

module.exports = React.createClass({

	togglePurchased:function(e){
		e.preventDefault();

		if (!this.props.item.purchased){
			groceryAction.buy(this.props.item);
		} else {
			groceryAction.unbuy(this.props.item);
		}
	},
	delete:function(e){
		e.preventDefault();
		groceryAction.delete(this.props.item);
	},
	render:function(){
		return (
			<div className="grocery-item row">
				<div className="six columns">
					<h4 className={this.props.item.purchased ? "strikethrough" : "" }>
						{this.props.item.name}
					</h4>
				</div>
				<form onSubmit={this.togglePurchased} className="three columns">
					<button className={this.props.item.purchased ? "" : "button-primary"}>{this.props.item.purchased ? "unbuy" : "buy"}</button>
				</form>
				<form className="three columns" onSubmit={this.delete}>
					<button>&times;</button>
				</form>
			</div>
		)
	}
})
