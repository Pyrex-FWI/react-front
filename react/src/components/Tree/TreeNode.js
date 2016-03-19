import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Directory from '../../controllers/Directory';

class TreeNode extends React.Component {

    constructor() {
        super();
        this.state = {
            children : [],
            expanded: false,
            childLoaded: false,
            filesContent: [],
            filesContentLoaded: false
        };
    }

    loadChild (path) {

        Directory
            .ls(path)
            .then( (data) => {
            this.setState({"children":data, "childLoaded":true});
        });
    }

    selectDir() {
        Directory.dispatchSelectDir(this.props.data);
        Directory.dispatchDirMetadata(this.props.data);
    }

    expand () {
        if (!this.state.childLoaded) {
            this.loadChild(this.props.data.pathName);
        }
        this.setState({'expanded': !this.state.expanded});
    }

    buildSubItems() {
        var subItems;
        if (_.some(this.state.children) && this.state.children.length > 0) {
            subItems = this.state.children.map(
                (item) => {
                    return (
                        <ul className="list">
                            <TreeNode
                                key={item.pathName}
                                data={item} />
                        </ul>
                    );
                });
        }
        return subItems;
    }

    render() {

        return (
            <li className="list__item" key={this.props.data.pathName}>
                <span >
                    <a>
                        <span onClick={_.bind(this.expand, this)} className={'glyphicon glyphicon-folder-' + (this.state.expanded? 'open':'close') }></span>
                    </a>
                        &nbsp;
                    <a onClick={_.bind(this.selectDir, this)}>{this.props.data.name}</a>
                </span>
                {this.state.expanded ? this.buildSubItems() : null }
            </li>
        )
    }

}

export default TreeNode;