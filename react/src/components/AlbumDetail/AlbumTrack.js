import React from 'react';
import ReactDOM from 'react-dom';
import Directory from '../../controllers/Directory';

class AlbumTrack extends React.Component {

    constructor() {
        super();
        this.playTrack = this.playTrack.bind(this);
        this.state = {
        };
    }

    playTrack() {
        Directory.dispatchPlayTrack(this.props.data);
    }

    render() {

        return (
                <tr >
                    <td ><span className="glyphicon glyphicon-music" ></span></td>
                    <td ><a onClick={this.playTrack} >{this.props.data.name}</a></td>
                    <td ><span >copy to ddj</span></td>
                </tr>
        )
    }

}

export default AlbumTrack;