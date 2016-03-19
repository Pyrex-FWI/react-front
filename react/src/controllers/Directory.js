import axios from 'axios';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';
import AlbumStore from '../stores/AlbumStore';

class DirectoryCrontoller {

    ls(path) {
        return axios.get(audioApiEndpoint + '/directory?path=' + path)
            .then( (response) => {
                return response.data
            } );
    }

    getContent(path) {
        return axios.get(audioApiEndpoint + '/directory/content?path=' + path)
            .then( (response) => {
                return response.data
            });
    }

    getDirMetadata(path) {
        return axios.get(audioApiEndpoint + '/directory/get-dir-metadata?path=' + path)
            .then( (response) => {
                return response.data
            });
    }

    saveMeta(data) {
        let url = audioApiEndpoint + '/directory/set-dir-metadata?path='+AlbumStore.getCurrentDirPathName()+'&g='+data.genre+'&y='+data.year
        return axios.get(url)
            .then( (response) => {
                return response.data
            });
    }

    dispatchSelectDir(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SELECT_DIR,
            data: data
        });
    }

    dispatchDirMetadata(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_DIR_AUDIO_METADATA,
            data: data
        });
    }

    dispatchPlayTrack(track) {
        track.url = audioApiEndpoint + '/stream?file=' + track.pathName;
        AppDispatcher.dispatch({
            actionType: AppConstants.PLAY_TRACK,
            track: track,
        });
    }
}

const DirectoryCtl = new DirectoryCrontoller();

export default DirectoryCtl;