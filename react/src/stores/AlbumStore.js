import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';
import Directory from '../controllers/Directory';
import _ from 'underscore';

export const TREE_NEED_RELOAD = 'onTreeIsOutDated';
const DIR_CHANGE_EVENT = 'onDirSelect';
const PLAY_TRACK_EVENT = 'onTrackPlay';
const DIR_AUDIO_METADATA_EVENT = 'onDirAudioMetadataUpdated';

let _tracks = {};
let _trackPlay = null;
let _currentDir = {
    name:"",
    pathName:""
};
let _currentDirAudioMetada = null;
let _albumYears = [];
let _albumGenres = [];

class AlbumStoreClass extends EventEmitter{

    getTracks() {
        return _tracks;
    }

    getTrackToPlay() {
        return _trackPlay;
    }

    getAlbumTracksMetadata() {
        return _currentDirAudioMetada;
    }

    getAlbumGenres() {
        return _albumGenres;
    }

    getAlbumYears() {
        return _albumYears;
    }

    addDirChangeListener(func) {
        this.on(DIR_CHANGE_EVENT, func);
    }

    removeDirChangeListener(func) {
        this.removeListener(DIR_CHANGE_EVENT, func);
    }

    addPlayTrackListener(func) {
        this.on(PLAY_TRACK_EVENT, func);
    }

    removePlayTrackListener(func) {
        this.removeListener(PLAY_TRACK_EVENT, func);
    }

    addAudioMetadataListener(func) {
        this.on(DIR_AUDIO_METADATA_EVENT, func);
    }

    removeAudioMetadataListener(func) {
        this.removeListener(DIR_AUDIO_METADATA_EVENT, func);
    }

    addTreeUpdateListener(func) {
        this.on(TREE_NEED_RELOAD, func);
    }

    removeTreeUpdateListener(func) {
        this.removeListener(TREE_NEED_RELOAD, func);
    }

    getCurrentDir() {
        return _currentDir;
    }

    getCurrentDirName() {
        return _currentDir.name;
    }

    getCurrentDirPathName() {
        return _currentDir.pathName;
    }
}

export const AlbumStore = new AlbumStoreClass();

AppDispatcher.register((payload) => {

    switch (payload.actionType) {

        case AppConstants.PLAY_TRACK:
            console.log(AppConstants.PLAY_TRACK);
            _trackPlay = payload.track;
            AlbumStore.emit(PLAY_TRACK_EVENT);

            break;

        case AppConstants.SELECT_DIR:
            console.log(AppConstants.SELECT_DIR);
            _tracks = {};
            _currentDir = payload.data;
            Directory.getContent(payload.data.pathName)
                .then( (data) => {
                    _tracks = data;
                    AlbumStore.emit(DIR_CHANGE_EVENT);
                });

            break;

        case AppConstants.GET_DIR_AUDIO_METADATA:
            console.log(AppConstants.GET_DIR_AUDIO_METADATA);
            _albumGenres = [];
            _albumYears = [];
            Directory.getDirMetadata(payload.data.pathName)
                .then( (data) => {
                    _currentDirAudioMetada = data;
                    data.map( item => {
                        _albumGenres.push(item.genre);
                        _albumYears.push(item.year);
                    })
                    _albumYears = (_.uniq(_albumYears));
                    _albumGenres = (_.uniq(_albumGenres));
                    AlbumStore.emit(DIR_AUDIO_METADATA_EVENT);
                });

            break;

        default:
            return true;
    }
});

export default AlbumStore;