import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import AlbumStore from '../../stores/AlbumStore';

class Player extends React.Component {

    constructor() {
        super();
        this.state = this.getStateFromStores();
        this._onTrackPlay = this._onTrackPlay.bind(this);
    }

    getStateFromStores() {
        return {
            track: AlbumStore.getTrackToPlay()
        };
    }

    _onTrackPlay() {
        this.setState(this.getStateFromStores());
    }

    componentDidMount() {
        AlbumStore.addPlayTrackListener(this._onTrackPlay);
    }

    componentWillUnmount() {
        AlbumStore.removePlayTrackListener(this._onTrackPlay);
    }

    render() {

        if (!_.some(this.state.track)) {
            return (<span>xxx</span>);
        }

        return (
            <span>
                {this.state.track.name}
                <audio autoPlay controls  src={this.state.track.url}>
                    <source type="audio/mpeg"  src={this.state.track.url} />
                </audio>
            </span>
        )

    }

}

export default Player;
