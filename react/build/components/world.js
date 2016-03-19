import React from 'react';
import ReactDOM from 'react-dom';

class World extends React.Component {
    render() {
        return React.createElement(
            'h1',
            null,
            'World'
        );
    }
}

ReactDOM.render(React.createElement(World, null), document.getElementById('world'));