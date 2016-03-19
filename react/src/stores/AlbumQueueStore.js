import { EventEmitter } from 'events';
import {AlbumStore, TREE_NEED_RELOAD} from './AlbumStore';
import Lockr from 'lockr';
import { AppConstants } from '../constants/AppConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import QueueCtl from '../controllers/Queue';
import _ from 'underscore';

const RM_QUEUE = 'react_audio_front_rm';
const MV_QUEUE = 'react_audio_front_mv';

const DELTED_LIST_HAS_CHANGED = 'onNewDeteledItem';
const COLLECTION_LIST_HAS_CHANGED = 'onCollectionItemHasChanged';

let _moveStack = Lockr.get(MV_QUEUE, []);
let _deleteStack = Lockr.get(RM_QUEUE, []);

class AlbumQueueStoreClass extends EventEmitter{

    saveDeleteQueue() {
        let dir = _deleteStack.shift();
        QueueCtl.dispatchRemoveDeleteItem(dir);

        if (_deleteStack.length > 0) {
            return this.saveDeleteQueue();
        }

        Lockr.set(RM_QUEUE, _deleteStack);
        setTimeout( () => { AlbumStore.emit(TREE_NEED_RELOAD); }, 2000);
    }

    saveCollectionQueue() {
        let dir = _moveStack.shift();
        QueueCtl.dispatchRemoveCollectionItem(dir);

        if (_moveStack.length > 0) {
            return this.saveCollectionQueue();
        }

        Lockr.set(MV_QUEUE, _moveStack);
        setTimeout( () => { AlbumStore.emit(TREE_NEED_RELOAD); }, 5000);
    }

    getMoveStack() {
        return _moveStack;
    }

    getDeleteStack() {
        return _deleteStack;
    }

    alreadyInStack( dir) {

        for (let i =0; i < _moveStack.length; i++) {
            if (_moveStack[i].pathName == dir.pathName) {
                return true;
            };
        }
        for (let i =0; i < _deleteStack.length; i++) {
            if (_deleteStack[i].pathName == dir.pathName) {
                return true;
            };
        }

        return false;
    }

    moveToDelete() {
        let dir = AlbumStore.getCurrentDir();
        if (!this.alreadyInStack(dir)) {
            _deleteStack.push(dir);
            Lockr.set(RM_QUEUE, _deleteStack);
            QueueCtl.dispatchDeletedQueueChange();
            AlbumStore.emit(DIR_AUDIO_METADATA_EVENT);
        }
    }

    moveToCollection() {
        let dir = AlbumStore.getCurrentDir();
        console.log(dir);
        console.log(this.alreadyInStack(dir));
        if (!this.alreadyInStack(dir)) {
            _moveStack.push(dir);
            Lockr.set(MV_QUEUE, _moveStack);
            QueueCtl.dispatchCollectionQueueChange();
        }
    }

    removeDeleteItemFromQueue(dir) {
        var i = _deleteStack.indexOf(dir);
        if (i > -1) {
            _deleteStack.splice(i, 1);
        }
        Lockr.set(RM_QUEUE, _deleteStack);
        QueueCtl.dispatchDeletedQueueChange();

    }

    removeCollectionItemFromQueue(dir) {
        var i = _moveStack.indexOf(dir);
        if (i > -1) {
            _moveStack.splice(i, 1);
        }
        Lockr.set(MV_QUEUE, _moveStack);
        QueueCtl.dispatchCollectionQueueChange();
    }

    addDeletedListener(func) {
        this.on(DELTED_LIST_HAS_CHANGED, func);

    }

    removeDeletedListener(func) {
        this.removeListener(DELTED_LIST_HAS_CHANGED, func);
    }

    addCollectionListener(func) {
        this.on(COLLECTION_LIST_HAS_CHANGED, func);

    }

    removeCollectionListener(func) {
        this.removeListener(COLLECTION_LIST_HAS_CHANGED, func);
    }

}

const AlbumQueueStore = new AlbumQueueStoreClass();

AppDispatcher.register((payload) => {

    switch (payload.actionType) {

        case AppConstants.DELETED_ITEMS_HAS_CHANGED:
            console.log(AppConstants.DELETED_ITEMS_HAS_CHANGED);

            AlbumQueueStore.emit(DELTED_LIST_HAS_CHANGED);
            break;

        case AppConstants.DELETE_ITEM:
            console.log(AppConstants.DELETE_ITEM);
            QueueCtl.delete(payload.data);
            AlbumQueueStore.emit(DELTED_LIST_HAS_CHANGED);
            break;

        case AppConstants.COLLECTION_ITEM:
            console.log(AppConstants.COLLECTION_ITEM);
            QueueCtl.move(payload.data);
            AlbumQueueStore.emit(COLLECTION_LIST_HAS_CHANGED);
            break;

        case AppConstants.COLLECTION_ITEM_HAS_CHANGED:
            console.log(AppConstants.COLLECTION_ITEM_HAS_CHANGED);
            AlbumQueueStore.emit(COLLECTION_LIST_HAS_CHANGED);
            break;

        default:
            return true;
    }
});

export default AlbumQueueStore;