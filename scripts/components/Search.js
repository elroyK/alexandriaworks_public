/* 
Search
<Search/>
*/

import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var http = require('http');

@autobind
class Search extends React.Component {

    search(event) {
        event.preventDefault();
        var query = this.refs.query.value;
        this.history.pushState(query, '/app');
    }

    render() {
        
        return (
            <div>
                <div id="home_header">
                    <img src="/build/css/images/agvespa.svg" id="home_logo"/>
                </div>
                <div id="home_search">
                    <form className="search" onSubmit={this.search}>
                        <input type="text" ref="query" placeholder="Zoek"/>
                        <button type="Submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
        )
    }
}

reactMixin.onClass(Search, History);

export default Search;
