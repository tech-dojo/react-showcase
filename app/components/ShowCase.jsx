"use strict";

let 
//GroceryItem = require('./GroceryItem.jsx'),
//	GroceryListAddItem = require('./GroceryListAddItem.jsx'),
    Header = require('./Header.jsx'),
	React = require('react'),
    GridList = require('material-ui/lib/grid-list/grid-list'),
    GridTile = require('material-ui/lib/grid-list/grid-tile'),
    IconButton = require('material-ui/lib/icon-button'),
    FontIcon = require('material-ui/lib/font-icon'),
    TextField = require('material-ui/lib/text-field'),
    FloatingActionButton = require('material-ui/lib/floating-action-button');


module.exports = React.createClass({

	render:function(){
		return (
			<div>
            <Header />
                <div className="container marginTop">
                <div className="search">
                    <TextField
                      hintText={<span>
                                    <FontIcon className="fa fa-search fa-1" color="rgb(158, 158, 158)"/> 
                                        Search Artist, Title, Medium
                                </span>}
                      hintStyle={{color: 'rgba(0, 0, 0, 0.41)'}}/>
            <FloatingActionButton iconClassName="fa fa-plus fa-2" secondary={true} />
                </div>
                <GridList
                  cellHeight={250}>
                  {this.props.pieces.map((tile) => {
                        return(
                            <GridTile
                                title={tile.title}
                                subtitle={<span>by <b>{tile.author}</b></span>}
                                actionIcon={<IconButton><FontIcon className="fa fa-heart-o" color="white"/></IconButton>}> 
                                <img src={tile.url} />
                            </GridTile>
                        )
                    })}
                </GridList>

                </div>                       
			</div>
		)
	}
})

    //				{this.props.items.map((item,index)=>{
    //					return (
    //						<GroceryItem item={item} key={"item"+index} />
    //					)
    //				})}
    //				<GroceryListAddItem />
