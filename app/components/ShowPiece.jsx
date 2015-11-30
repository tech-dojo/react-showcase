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
    return {pieces: ShowPieceStore.getShowPiece()}
}
class ShowPiece extends React.Component {
    constructor(props, context){
        super(props, context);
        ShowPieceStore.fetchShowPiece(props.params.id);  
        this.state = context.data;
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
        this.setState( getShowPiece() );
    }
    _likeHandle(e){
        if(!this.liked){
            ShowPieceAction.like(this.state.pieces);
            this.liked = true;
        }else{
            ShowPieceAction.unlike(this.state.pieces);
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
                title={<span className="title-piece">{this.state.pieces.title} <span className="sub">{this.state.pieces.medium ? '|' : ''} {this.state.pieces.medium}</span></span>} 
                subtitle={<div>
                            <span className="piece-likes">
                                <i className="fa fa-heart" color="white"/> 
                             {this.state.pieces.likes}
                            </span>
                            <span className="likes-showcase">
                                <IconButton onClick={this._likeHandle.bind(this)}>
                                    <FontIcon className={this.liked ? "fa fa-heart" : "fa fa-heart-o" } color={this.liked ? "#E61E1E": "white"}/>
                                </IconButton>
                            </span>
                          </div>}
             />}
            >
                <img className="piece" src={this.state.pieces.url}/>
              </CardMedia>
            <CardTitle title={<span>Artist: {this.state.pieces.artist}</span>} subtitle={<span>Contributed by  {this.state.pieces.contributor}</span>}/>
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







//
//class ShowCase extends React.Component {
//    constructor(){
//        super();
//        ShowPieceStore.fetchShowcase();
//        this.state = getCatalog();
//        this._onChange = this._onChange.bind( this );
//        
//    }
//    componentWillMount() {
//        ShowPieceStore.onChange(this._onChange);
//    }
//    _onChange() {
//        this.setState( getCatalog() );
//    }
//
//	render(){
//		return (
//			<div>
//                <div className="container marginTop">
//                <div className="search">
//                    <TextField
//                      hintText={<span>
//                                    <FontIcon className="fa fa-search fa-1" color="rgb(158, 158, 158)"/> 
//                                        Search Artist, Title, Medium
//                                </span>}
//                      hintStyle={{color: 'rgba(0, 0, 0, 0.41)'}}/>
//                <Link to="/about">
//                <FloatingActionButton iconClassName="fa fa-plus fa-2" secondary={true} />
//            </Link>
//                </div>
//                <GridList
//                  cellHeight={250}>
//                  {this.state.pieces.map((tile) => {
//                        return(
//                            <Link to={`/showpiece/${tile._id}`}>
//                                <GridTile
//                                title={tile.title}
//                                key={tile._id}
//                                subtitle={<span>by <b>{tile.author}</b></span>}
//                                actionIcon={<IconButton><FontIcon className="fa fa-heart-o" color="white"/></IconButton>}> 
//                                <img src={tile.url} />
//                            </GridTile></Link>
//                        )
//                    })}
//                </GridList>
//
//                </div>                       
//			</div>
//		)
//	}
//}

//export default ShowCase;

    //				{this.props.items.map((item,index)=>{
    //					return (
    //						<GroceryItem item={item} key={"item"+index} />
    //					)
    //				})}
    //				<GroceryListAddItem />


//var dispatcher = require("./../dispatcher.js");
//var showcaseAction = require("./../stores/ShowPieceActionCreator.jsx");
//var React = require('react');
//
//module.exports = React.createClass({
//
//	togglePurchased:function(e){
//		e.preventDefault();
//
//		if (!this.props.item.purchased){
//			showcaseAction.buy(this.props.item);
//		} else {
//			showcaseAction.unbuy(this.props.item);
//		}
//	},
//	delete:function(e){
//		e.preventDefault();
//		showcaseAction.delete(this.props.item);
//	},
//	render:function(){
//		return (
//			<div className="grocery-item row">
//				<div className="six columns">
//					<h4 className={this.props.item.purchased ? "strikethrough" : "" }>
//						{this.props.item.name}
//					</h4>
//				</div>
//				<form onSubmit={this.togglePurchased} className="three columns">
//					<button className={this.props.item.purchased ? "" : "button-primary"}>                             {this.props.item.purchased ? "unbuy" : "buy"}</button>
//				</form>
//				<form className="three columns" onSubmit={this.delete}>
//					<button>&times;</button>
//				</form>
//			</div>
//		)
//	}
//})
