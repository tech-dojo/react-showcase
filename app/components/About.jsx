
import React from 'react';
import Paper from 'material-ui/lib/paper';

class About extends React.Component {

	render(){
		return (
			<div className="container marginTop">
				<Paper zDepth={1} className="mediaPiece">
					<div className="about">
						<h4>About</h4>
						<p>
							An isomorphic ReactJS application with a Node-Express-MongoDB backend.
						</p>
					</div>
				</Paper>
				<br/>
			</div>
		)
	}
}

export default About;
