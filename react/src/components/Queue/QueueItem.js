import React from 'react';
import ReactDOM from 'react-dom';
import AlbumQueueStore from '../../stores/AlbumQueueStore';

class QueueItem extends React.Component {

    constructor() {
        super();
        this.state = {
        };
        this._delete = this._delete.bind(this);
    }

    _delete() {
        this.props.removeItem(this.props.data);
    }

    render() {

        return (
            <tr >
                <td >
                    <button onClick={this._delete} className="btn btn-danger btn-xs" type="button" >
                        <span aria-hidden="true" className="glyphicon glyphicon-remove" ></span>
                    </button>
                </td>
                <td >{this.props.data.name}</td>
            </tr>
        )
    }

}

export default QueueItem;