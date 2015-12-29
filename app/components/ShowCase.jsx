"use strict";

import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import ShowPieceStore from './../stores/ShowPieceStore.jsx';
import ShowPieceAdd from './ShowPieceAdd.jsx';
import { Link } from 'react-router';

function getCatalog() {
    return ShowPieceStore.getShowPieces();
}


class ShowCase extends React.Component {
    constructor(props, context){
        super(props, context);
        ShowPieceStore.fetchShowcase();
        this.state = {};
        this.state.pieces = context.data;
        this.state['searchString'] = '';
        this._onChange = this._onChange.bind( this );
    }
    componentWillMount() {
        ShowPieceStore.onChange(this._onChange);
    }
    componentWillUnmount() {
        ShowPieceStore.removeChangeListener( this._onChange );
    }
    _onChange() {
        this.setState( {'pieces':getCatalog()} );
    }

    _handleSearch(e){
        this.setState({searchString:e.target.value});
    }



	render(){

        var pieces = this.state.pieces,
            searchString = this.state.searchString.trim().toLowerCase();


        if(searchString.length > 0){

            // We are searching. Filter the results.

            pieces = pieces.filter(function(l){
                var result = l.artist.toLowerCase().match( searchString ) ||
                    l.title.toLowerCase().match( searchString );
                if(l.medium){
                    result = result || l.medium.toLowerCase().match( searchString );
                }
                    return result;
            });

        }
		return (

			<div>

                <div className="container marginTop">
                <div className="search">
                    <TextField
                      value={this.state.searchString} onChange={this._handleSearch.bind(this)} hintText={<span>
                                    <FontIcon className="fa fa-search fa-1" color="rgb(158, 158, 158)"/>
                                        Search Artist, Title, Medium
                                </span>}
                      hintStyle={{color: 'rgba(0, 0, 0, 0.41)'}}/>
                <ShowPieceAdd />

                </div>
                <GridList
                  cellHeight={250}>
                  {(pieces.reverse()).map((tile) => {
                        return(
                            <Link to={`/showpiece/${tile._id}`} key={tile._id}>
                                <GridTile
                                title={<span><span className="title-showcase">{tile.title}</span> {tile.medium ? '|' : ''} {tile.medium}</span>}

                                subtitle={<div><span>by <b>{tile.artist}</b></span><span className="likes-showcase">{tile.likes} <FontIcon className="fa fa-heart" color="#E61E1E"/></span></div>}
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

ShowCase.contextTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]).isRequired
};


export default ShowCase;
