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
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';
import auth from './../services/Authentication';

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
    this.state.loggedIn = auth.loggedIn();
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
  _delete(e){
    ShowPieceAction.delete(this.state.piece);
  }

  render(){
    var pieceFound = this.state.piece === "deleted" || this.state.piece === "Not Authorized" ? false : true;
    return (

      <div className="container marginTop">

        <Paper zDepth={1} className="mediaPiece">
          {pieceFound && (
            <Card>
              <CardMedia
                overlay={
                  <CardTitle
                    title={
                      <span className="title-piece">
                        {this.state.piece.title}
                        <span className="sub">
                          {this.state.piece.medium ? '|' : ''} {this.state.piece.medium}
                        </span>
                      </span>
                    }
                    subtitle={
                      <div>
                        <span className="piece-likes">
                          <i className="fa fa-heart" color="white"/>
                          {this.state.piece.likes}
                        </span>
                        <span className="likes-showcase">
                          <IconButton onClick={this._likeHandle.bind(this)}>
                            <FontIcon
                              className={this.liked ? "fa fa-heart" : "fa fa-heart-o" }
                              color={this.liked ? "#E61E1E": "white"}/>
                          </IconButton>
                        </span>
                      </div>
                    }
                    />
                }
                >
                <img
                  className="piece"
                  src={this.state.piece.url}/>
              </CardMedia>
              <CardTitle
                title={
                  <div>
                    <span>
                      Artist: {this.state.piece.artist}
                    </span>
                    { this.state.loggedIn &&
                      <span className="edit_delete">
                        <IconButton onClick={this._delete.bind(this)}>
                          <FontIcon className="fa fa-edit" color="gray"/>
                        </IconButton>
                        <IconButton onClick={this._delete.bind(this)}>
                          <FontIcon
                            className="fa fa-trash"
                            color="#E61E1E"/>
                        </IconButton>
                      </span>
                    }

                  </div>
                }
                subtitle={
                  <span>
                    Contributed by  {this.state.piece.contributor}
                  </span>
                }/>
              </Card>
            )}
            {this.state.piece === "deleted" &&
              (
                <div className="about">

                  <p>
                    This piece has been deleted. Go back to the <Link to="/">ShowCase</Link>
                </p>

              </div>
            )}
            {this.state.piece === "Not Authorized" &&
              (
                <div className="about">

                  <p>
                    Your session timed out. <Link to="/signin">
                    Sign in again.
                  </Link>
                </p>

              </div>
            )}
          </Paper>
          <br/>
        </div>
      )
    }
  }

  ShowPiece.contextTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]).isRequired
  };

  export default ShowPiece;
