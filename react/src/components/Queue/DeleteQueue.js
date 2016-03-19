import React from 'react';
import ReactDOM from 'react-dom';
import AlbumQueueStore from '../../stores/AlbumQueueStore';
import QueueItem from './QueueItem';
import _ from 'underscore';

class DeleteQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getStateFromStores();

        this._onNewDeletedItem = this._onNewDeletedItem.bind(this);
    }

    getStateFromStores() {
        return {
            items: AlbumQueueStore.getDeleteStack(),
        };
    }

    _onNewDeletedItem()
    {
        this.setState(this.getStateFromStores());
    }

    componentDidMount() {
        this.props.deletedEvents.add(this._onNewDeletedItem);
    }

    componentWillUnmount() {
        this.props.deletedEvents.remove(this._onNewDeletedItem);

    }

    render() {
        return (
            <div className="col-md-6 bottom-left panel panel-warning" >
                <div className="panel-heading" >
                    <h4 className="panel-title" >Delete queue ({this.state.items.length})</h4>
                    <ul className="action-link-list" >
                        <li >
                            <a onClick={this.props.onSaveQueue} className="color-black" href="#" title="Apply/Push messages" >
                                <span className="glyphicon glyphicon-floppy-save" ></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="panel-body" >
                    <table className="table table-striped" >
                        <tbody >
                        {_.some(this.state.items) ? this.state.items.map( (item) => { return <QueueItem removeItem={_.bind(AlbumQueueStore.removeDeleteItemFromQueue, AlbumQueueStore)} key={item.name} data={item}/>} ) : null }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default DeleteQueue;