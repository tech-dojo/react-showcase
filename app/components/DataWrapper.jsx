import React from 'react';

class DataWrapper extends React.Component {

    getChildContext () {

        return {
            data: this.props.data
        };
    }

    render () {

        return this.props.children;
    }
}

DataWrapper.childContextTypes = {
    data: React.PropTypes.object.isRequired
};

export default DataWrapper;