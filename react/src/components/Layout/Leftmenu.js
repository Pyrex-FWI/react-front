import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from '../Tree/TreeView';

export default class Leftmenu extends React.Component {

    render() {
        return (
            <div className="col-md-3 dir-list left-pane" >
                <div className="mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <TreeView startPoint="Root"/>
                </div>
            </div>
        )
    }
}
