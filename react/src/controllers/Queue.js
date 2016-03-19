import axios from 'axios';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';

class QueueController {

    dispatchDeletedQueueChange() {
        AppDispatcher.dispatch({
            actionType: AppConstants.DELETED_ITEMS_HAS_CHANGED,
        });
    }

    dispatchCollectionQueueChange() {
        AppDispatcher.dispatch({
            actionType: AppConstants.COLLECTION_ITEM_HAS_CHANGED,
        });
    }

    move(dir) {
        return axios.get(audioApiEndpoint + '/directory/move?path=' + dir.pathName)
            .then( (response) => {
                return response.data
            });
    }

    delete(dir) {
        return axios.get(audioApiEndpoint + '/directory/delete?path=' + dir.pathName)
            .then( (response) => {
                return response.data
            });
    }

    dispatchRemoveDeleteItem(dir) {
        AppDispatcher.dispatch({
            actionType: AppConstants.DELETE_ITEM,
            data: dir
        });
    }

    dispatchRemoveCollectionItem(dir) {
        AppDispatcher.dispatch({
            actionType: AppConstants.COLLECTION_ITEM,
            data: dir
        });
    }
}

const QueueCtl = new QueueController();

export default QueueCtl;