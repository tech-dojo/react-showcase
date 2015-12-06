import React from 'react';
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const Paper = require('material-ui/lib/paper');


import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import ShowPieceStore from './../stores/ShowPieceStore.jsx';
import ShowPieceAction from './../stores/ShowPieceActionCreator.jsx';
import { Link } from 'react-router';

function getShowPiece() {
    return ShowPieceStore.getShowPiece();
}
class ShowPiece extends React.Component {
    constructor(props, context){
        super(props, context);
        ShowPieceStore.fetchShowPiece(props.params.id);  
        this.state = {};
        this.state.piece = context.data;
        this._onChange = this._onChange.bind( this );
        this.liked = false;
        
    }
    componentWillMount() {
        ShowPieceStore.onChange(this._onChange);
    }
    componentWillUnmount() {
        ShowPieceStore.removeChangeListener( this._onChange );
    }
    _onChange() {
        this.setState( {'piece': getShowPiece()} );
    }
    _likeHandle(e){
        if(!this.liked){
            ShowPieceAction.like(this.state.piece);
            this.liked = true;
        }else{
            ShowPieceAction.unlike(this.state.piece);
            this.liked = false;
        }
    }

	render(){
		return (
            
			 <div className="container marginTop">
            <Paper zDepth={1} className="mediaPiece">
            <Card>
              <CardMedia 
                overlay={
            <CardTitle 
                title={<span className="title-piece">{this.state.piece.title} <span className="sub">{this.state.piece.medium ? '|' : ''} {this.state.piece.medium}</span></span>} 
                subtitle={<div>
                            <span className="piece-likes">
                                <i className="fa fa-heart" color="white"/> 
                             {this.state.piece.likes}
                            </span>
                            <span className="likes-showcase">
                                <IconButton onClick={this._likeHandle.bind(this)}>
                                    <FontIcon className={this.liked ? "fa fa-heart" : "fa fa-heart-o" } color={this.liked ? "#E61E1E": "white"}/>
                                </IconButton>
                            </span>
                          </div>}
             />}
            >
                <img className="piece" src={this.state.piece.url}/>
              </CardMedia>
            <CardTitle title={<span>Artist: {this.state.piece.artist}</span>} subtitle={<span>Contributed by  {this.state.piece.contributor}</span>}/>
            </Card>
     </Paper>
            <br/>
            </div>
		)
	}
}

ShowPiece.contextTypes = {
    data: React.PropTypes.object.isRequired
};

export default ShowPiece;