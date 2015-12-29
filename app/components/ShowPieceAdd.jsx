import React from 'react';
import ShowPieceAction from './../stores/ShowPieceActionCreator.jsx';
import Dialog from 'material-ui/lib/dialog';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import TextField from 'material-ui/lib/text-field';

class ShowPieceAdd extends React.Component {
  constructor(props, context){
    super(props, context);
    this._handleAddDialogTap = this._handleAddDialogTap.bind(this);
    this.newPiece = {};
    this.state = {};
    this.state['openDialogStandardActions'] = false;
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this._handleContributorChange =this._handleContributorChange.bind(this);
    this._handleMediumChange = this. _handleMediumChange.bind(this);
    this._handleArtistChange = this._handleArtistChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleUrlChange = this._handleUrlChange.bind(this);
  }
  _handleAddDialogTap(){
    this.setState({
      openDialogStandardActions: true,
    });
  }
  _handleRequestClose() {
    this.setState({
      openDialogStandardActions: false,
    });
  }
  _onDialogSubmit(){
    if(!this.newPiece.url){
      this.setState({
        urlErrorText:'This field is required.'
      });
    }else if(!this.newPiece.title){
      this.setState({
        titleErrorText:'This field is required.'
      });
    }else if(!this.newPiece.artist){
      this.setState({
        artistErrorText:'This field is required.'
      });
    }else{
      ShowPieceAction.add({
        title: this.newPiece.title,
        artist: this.newPiece.artist,
        medium: this.newPiece.medium,
        contributor: this.contributor,
        url: this.newPiece.url
      });
      this.setState({
        openDialogStandardActions: false,
      });
    }
  }

  render(){
    let standardActions = [
      {text: 'Cancel'},
      {text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit'},
    ];
    return (
      <span>
        <FloatingActionButton
          iconClassName="fa fa-plus fa-2"
          secondary={true}
          onTouchTap={this._handleAddDialogTap}/>
        <Dialog
          ref="standardDialog"
          title="Add Art Piece"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
          open={this.state.openDialogStandardActions}
          onRequestClose={this._handleRequestClose}>
          <form>
            <TextField
              hintText="Enter URL Link"
              errorText={this.state.urlErrorText}
              floatingLabelText="Art Link"
              onChange={this._handleUrlChange}
              value={this.newPiece.url}
              />
            <br/>
            <TextField
              hintText="Enter Art Title"
              errorText={this.state.titleErrorText}
              floatingLabelText="Art Title"
              onChange={this._handleTitleChange}
              value={this.newPiece.title}
              />
            <br/>
            <TextField
              hintText="Enter artist's name"
              errorText={this.state.artistErrorText}
              floatingLabelText="Artist"
              onChange={this._handleArtistChange}
              value={this.newPiece.artist}
              />
            <br/>
            <TextField
              hintText="Enter medium"
              floatingLabelText="Medium"
              onChange={this._handleMediumChange}
              value={this.newPiece.medium}
              />
            <br/>
            <TextField
              hintText="Your name"
              floatingLabelText="Contributor"
              onChange={this._handleContributorChange}
              value={this.newPiece.contributor}
              />



          </form>

        </Dialog>


      </span>
    )
  }
  _handleUrlChange(e){
    this.newPiece.url = e.target.value;
    var errorMsg = '';
    if(!e.target.value){
      errorMsg ='This field is required.';
    }else if(!(e.target.value.match(/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/i))){
      errorMsg ='Enter a valid image url';
    }
    this.setState({
      urlErrorText: errorMsg
    });
  }
  _handleTitleChange(e){
    this.newPiece.title = e.target.value;
    this.setState({
      titleErrorText: e.target.value ? '' : 'This field is required.'
    });
  }

  _handleArtistChange(e){
    this.newPiece.artist = e.target.value;
    this.setState({
      artistErrorText: e.target.value ? '' : 'This field is required.'
    });
  }

  _handleMediumChange(e){
    this.newPiece.medium = e.target.value;
  }

  _handleContributorChange(e){
    this.newPiece.contributor = e.target.value;
  }
}



export default ShowPieceAdd;
