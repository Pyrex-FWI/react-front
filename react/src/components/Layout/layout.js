import React from 'react';
import ReactDOM from 'react-dom';
import Leftmenu from './Leftmenu';
import AlbumDetail from '../AlbumDetail/AlbumDetail';
import Player from '../Player/Player';
import Meta from '../GenreYear/Meta';
import AlbumStore from '../../stores/AlbumStore';
import AlbumQueueStore from '../../stores/AlbumQueueStore';
import DeleteQueue from '../Queue/DeleteQueue';
import CollectionQueue from '../Queue/CollectionQueue';
import Directory from '../../controllers/Directory';

import _ from 'underscore';

export default class Layout extends React.Component {

    render() {
        return (
            <div className="row" >

                <Leftmenu startPoint="Root" />

                <div className="col-md-3" >
                </div>

                <div className="col-md-9 right-pane" >

                    <div className="rowv first" >

                        <AlbumDetail />
                        <Meta
                            onAddToCollection={_.bind(AlbumQueueStore.moveToCollection, AlbumQueueStore)}
                            onAddToDelete={_.bind(AlbumQueueStore.moveToDelete, AlbumQueueStore)}
                            onSave={_.bind(Directory.saveMeta, Directory)}
                        />

                        <DeleteQueue
                            deletedEvents={ {add: _.bind(AlbumQueueStore.addDeletedListener, AlbumQueueStore), "remove": AlbumQueueStore.removeDeletedListener}}
                            onSaveQueue={_.bind(AlbumQueueStore.saveDeleteQueue, AlbumQueueStore)}
                        />


                        <CollectionQueue
                            deletedEvents={ {add: _.bind(AlbumQueueStore.addCollectionListener, AlbumQueueStore), "remove": AlbumQueueStore.removeCollectionListener}}
                            onSaveQueue={_.bind(AlbumQueueStore.saveCollectionQueue, AlbumQueueStore)}
                        />


                        <div className="col-md-12 player" >
                            <Player />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

ReactDOM.render(<Layout/>, document.getElementById('layout'));