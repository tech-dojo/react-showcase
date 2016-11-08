
import React from 'react';
import Paper from 'material-ui/Paper';
import auth from './../services/Authentication';
import { Link  } from 'react-router';



class SignOut extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  componentDidMount() {
    auth.logout();
  }


  render(){
    return (
      <div className="container marginTop">

        <Paper zDepth={1} className="mediaPiece">

          <div className="about">

            <p>
              You are logged out. Go back to <Link to="/">Home</Link>
          </p>

        </div>

      </Paper>

      <br/>

    </div>
  )
}
}

export default SignOut;
