/* 
SearchPanel
<SearchPanel/>
*/

import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var http = require('http');

@autobind
class SearchPanel extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            callback: (this.props.search)()
        }
    }
    
    search(event) {
        event.preventDefault();
        this.state.callback(this.refs.query.value);
    }

    render() {
        
        return (
            <div className="panel panel_search">
                <form onSubmit={this.search}>
                    <input ref="query" type="text"/>
                    <button type="Submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                </form>
            </div>
        )
    }
}

reactMixin.onClass(SearchPanel, History);

export default SearchPanel;
