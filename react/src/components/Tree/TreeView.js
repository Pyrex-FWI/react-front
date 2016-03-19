import React from 'react';
import ReactDOM from 'react-dom';
import TreeNode from './TreeNode';
import Directory from '../../controllers/Directory';
import AlbumStore from '../../stores/AlbumStore';

class TreeView extends React.Component {

    constructor(props) {
        super(props);
        this.props = {
            "startPoint": ""
        };

        this.state = {
            dataSet : [],
        };

        this.loadTreeData = this.loadTreeData.bind(this);
    }

    loadTreeData() {
        Directory
            .ls("")
            .then( (data) => {
                this.setState({"dataSet":data});
            });
    }

    componentDidMount() {
        AlbumStore.addTreeUpdateListener(this.loadTreeData);
        this.loadTreeData();
    }

    componentWillUnmount() {
        AlbumStore.removeTreeUpdateListener(this.loadTreeData);
    }

    render() {

        return (
            <div className="treeview">
                <span className="treeview-title">{this.props.startPoint} </span>
                <span className="badge">{this.state.dataSet.length}</span>
                <span >
                    <a href="#" onClick={this.loadTreeData}>
                        <span aria-hidden="true" className="glyphicon glyphicon-refresh" ></span>
                    </a>
                </span>
                <ul className="list">
                    {this.state.dataSet.map( (item) => { return <TreeNode key={item.pathName} data={item} /> } )}
                </ul>
            </div>
        );
    }
}

export default TreeView;