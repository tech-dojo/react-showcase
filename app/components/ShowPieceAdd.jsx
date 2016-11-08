import React from 'react';
import ShowPieceAction from './../stores/ShowPieceActionCreator.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

class ShowPieceAdd extends React.Component {
  constructor(props, context){
    super(props, context);
    this._handleAddDialogTap = this._handleAddDialogTap.bind(this);
    this.state = {};
    this.state.open = false;
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
      open: true
    });
  }
  _handleRequestClose() {
    this.setState({
      open: false
    });
  }
  _onDialogSubmit(){
    if(!this.state.url){
      this.setState({
        urlErrorText:'This field is required.'
      });
    }else if(!this.state.title){
      this.setState({
        titleErrorText:'This field is required.'
      });
    }else if(!this.state.artist){
      this.setState({
        artistErrorText:'This field is required.'
      });
    }else{
      ShowPieceAction.add({
        title: this.state.title,
        artist: this.state.artist,
        medium: this.state.medium,
        contributor: this.state.contributor,
        url: this.state.url
      });
      this.setState({
        open: false,
      });
    }
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this._handleRequestClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this._onDialogSubmit}
      />,
    ];
    return (
      <span>
        <FloatingActionButton
          iconClassName="fa fa-plus fa-2"
          secondary={true}
          onClick={this._handleAddDialogTap}/>
        <Dialog
          title="Add Art Piece"
          actions={actions}
          modal={true}
          open={this.state.open}>
          <form>
            <TextField
              hintText="Enter URL Link"
              errorText={this.state.urlErrorText}
              floatingLabelText="Art Link"
              onChange={this._handleUrlChange}
              value={this.state.url}
              />
            <br/>
            <TextField
              hintText="Enter Art Title"
              errorText={this.state.titleErrorText}
              floatingLabelText="Art Title"
              onChange={this._handleTitleChange}
              value={this.state.title}
              />
            <br/>
            <TextField
              hintText="Enter artist's name"
              errorText={this.state.artistErrorText}
              floatingLabelText="Artist"
              onChange={this._handleArtistChange}
              value={this.state.artist}
              />
            <br/>
            <TextField
              hintText="Enter medium"
              floatingLabelText="Medium"
              onChange={this._handleMediumChange}
              value={this.state.medium}
              />
            <br/>
            <TextField
              hintText="Your name"
              floatingLabelText="Contributor"
              onChange={this._handleContributorChange}
              value={this.state.contributor}
              />



          </form>

        </Dialog>


      </span>
    )
  }
  _handleUrlChange(e){
    this.setState({url : e.target.value});
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
    this.setState({title : e.target.value});
    this.setState({
      titleErrorText: e.target.value ? '' : 'This field is required.'
    });
  }

  _handleArtistChange(e){
    this.setState({artist : e.target.value});
    this.setState({
      artistErrorText: e.target.value ? '' : 'This field is required.'
    });
  }

  _handleMediumChange(e){
    this.setState({medium : e.target.value});
  }

  _handleContributorChange(e){
    this.setState({contributor : e.target.value});
  }
}



export default ShowPieceAdd;
