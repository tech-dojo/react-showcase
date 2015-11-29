"use strict";

import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ShowPieceStore from './../stores/ShowPieceStore.jsx';
import { Link } from 'react-router';

function getCatalog() {
    return {pieces: ShowPieceStore.getShowPieces()}
}


class ShowCase extends React.Component {
    constructor(){
        super();
        ShowPieceStore.fetchShowcase();
                console.log('wtf');
        this.state = getCatalog();
        this._onChange = this._onChange.bind( this );
        
    }
    componentWillMount() {
        ShowPieceStore.onChange(this._onChange);
    }
    componentWillUnmount() {
        ShowPieceStore.removeChangeListener( this._onChange );
    }
    _onChange() {
        this.setState( getCatalog() );
    }

	render(){
		return (
			<div>
                <div className="container marginTop">
                <div className="search">
                    <TextField
                      hintText={<span>
                                    <FontIcon className="fa fa-search fa-1" color="rgb(158, 158, 158)"/> 
                                        Search Artist, Title, Medium
                                </span>}
                      hintStyle={{color: 'rgba(0, 0, 0, 0.41)'}}/>
                <Link to="/about">
                <FloatingActionButton iconClassName="fa fa-plus fa-2" secondary={true} />
            </Link>
                </div>
                <GridList
                  cellHeight={250}>
                  {this.state.pieces.map((tile) => {
                        return(
                            <Link to={`/showpiece/${tile._id}`} key={tile._id}>
                                <GridTile
                                title={<span><span className="title-showcase">{tile.title}</span> {tile.medium ? '|' : ''} {tile.medium}</span>}
                                
                                subtitle={<div><span>by <b>{tile.artist}</b></span><span className="likes-showcase">{tile.likes} <FontIcon className="fa fa-heart-o" color="white"/></span></div>}
                                actionIcon={<IconButton></IconButton>}> 
                                <img src={tile.url} />
                            </GridTile></Link>
                        )
                    })}
                </GridList>
<br/>
                </div>                       
			</div>
		)
	}
}

export default ShowCase;

    //				{this.props.items.map((item,index)=>{
    //					return (
    //						<GroceryItem item={item} key={"item"+index} />
    //					)
    //				})}
    //				<GroceryListAddItem />
