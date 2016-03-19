import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import AlbumTrack from './AlbumTrack';
import AlbumStore from '../../stores/AlbumStore';

class AlbumDetail extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = this.getStateFromStores();
    }

    getStateFromStores() {
        return {
            trackList: AlbumStore.getTracks(),
            currentDir: AlbumStore.getCurrentDirName()
        };
    }

    _onChange() {
        this.setState(this.getStateFromStores());
    }

    componentDidMount() {
        AlbumStore.addDirChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AlbumStore.removeDirChangeListener(this._onChange);
    }

    render() {
        return (
            <div className="col-md-6  directory-content-list top-left panel panel-primary" >
                <div className="panel-heading" >
                    <h3 className="panel-title" >{_.some(this.state.currentDir)? this.state.currentDir: 'Select a dir from tree pane'}</h3>
                </div>
                <div className="panel-body" >
                    <table className="table table-striped" >
                        <thead >
                        <tr>
                            <th >#</th>
                            <th >Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        { _.some(this.state.trackList) ? this.state.trackList.map( (track) => { return <AlbumTrack key={track.name} data={track} /> }):null }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default AlbumDetail;