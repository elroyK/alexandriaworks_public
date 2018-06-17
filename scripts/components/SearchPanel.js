/* 
SearchPanel
<SearchPanel/>
*/

import React from 'react';
import Panel from './Panel';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var http = require('http');

import $ from 'jquery';

@autobind
class SearchPanel extends Panel {
    
    constructor(props) {
        super(props);
        
        this.state = {
            callback: (this.props.search)(),
            docSearch: this.props.docSearch ? this.props.docSearch : null
        }
    }
    
    search(event) {
        event.preventDefault();
        this.state.callback(this.refs.query.value);
    }
    
    componentDidMount() {
        $('.panel:last-child').css("opacity","1");
        $('.panel:last-child').css("top","0");
        var input = $("input:text:visible:last");
        var len = input.val().length;
        input[0].focus();
        input[0].setSelectionRange(len, len);
    }

    render() {
        
        return (
            <div className="panel panel_search">
                <form onSubmit={this.search}>
                    <input ref="query" type="text" defaultValue={(this.state.docSearch ? this.state.docSearch : "")}/>
                    <button type="Submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                </form>
            </div>
        )
    }
}

reactMixin.onClass(SearchPanel, History);

export default SearchPanel;
