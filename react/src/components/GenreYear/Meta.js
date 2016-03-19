import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import AlbumStore from '../../stores/AlbumStore';
import AlbumQueueStore from '../../stores/AlbumQueueStore';

class Meta extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onAddToCollection = this._onAddToCollection.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.state = this.getStateFromStores();
    }

    getStateFromStores() {
        return {
            metadata: AlbumStore.getAlbumTracksMetadata(),
            albumYear: AlbumStore.getAlbumYears(),
            albumGenre: AlbumStore.getAlbumGenres(),
            isInQueue: AlbumQueueStore.alreadyInStack(AlbumStore.getCurrentDir()),
        };
    }

    _onChange() {
        console.log('OnChange');
        this.setState(this.getStateFromStores());
    }

    _onSave() {
        console.log('onSave')
        this.props.onSave({'genre':this.state.albumGenre, 'year':this.state.albumYear});
    }

    _onAddToCollection() {
        console.log('add to collection')
        this.props.onAddToCollection();
    }

    componentDidMount() {
        AlbumStore.addAudioMetadataListener(this._onChange);
    }

    componentWillUnmount() {
        AlbumStore.removeAudioMetadataListener(this._onChange);
    }

    handleGenreChange(name, e) {
        console.log(e.target.value);
        let state = {};
        state[name] = e.target.value;
        this.setState(state);
    }

    renderCollectionButton() {
        if (!this.state.isInQueue) {
            return (
                <button onClick={this._onAddToCollection} className="btn btn-success btn-xs" type="button">
                    <span className="glyphicon glyphicon-ok"></span>
                    Add to collection
                </button>
            );
        }
    }

    render() {

        if (!_.some(this.state.metadata)) {
            return (
                <div className="col-md-6 top-right  panel panel-default" >
                </div>
                )
        }

        return (
            <div className="col-md-6 top-right  panel panel-default" >
                <div >
                    <p >
                        Genre <span className="badge" >1</span>:
                                    <span >
                            <span className="label label-default" >{this.state.albumGenre}</span>

                        </span>
                    </p>
                    <p >
                        Year <span className="badge" >1</span>:
                            <span >
                              <span className="label label-primary" >{this.state.albumYear}</span>
                          </span>
                    </p>
                </div>
                {this.renderCollectionButton()}
                <button onClick={this.props.onAddToDelete} className="btn btn-danger btn-xs" type="button">
                    <span className="glyphicon glyphicon-remove" ></span>
                    Add to Delete
                </button>
                <div >
                    <div >
                        <p ><input className="" onChange={_.bind(this.handleGenreChange, this, 'albumGenre') } value={this.state.albumGenre}/></p>
                        <p ><input className="" onChange={_.bind(this.handleGenreChange, this, 'albumYear') } value={this.state.albumYear}/></p>
                        <button onClick={this._onSave} className="btn btn-warning btn-xs" type="button" >
                            Apply
                        </button>

                    </div>
                </div>


            </div>

        )
    }

}

export default Meta;