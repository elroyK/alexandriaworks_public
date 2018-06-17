/*
NavPanel
<NavPanel/>
*/

import React from 'react';

var http = require('http');

class NavPanel extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            callbackPinned: (this.props.showPinned)(),
            callbackSearch: (this.props.showSearch)()
        }
        
        this.showPinned = this.showPinned.bind(this);
        this.showSearch = this.showSearch.bind(this);
    }
    
    showPinned() {
        event.preventDefault();
        this.state.callbackPinned();
    }
    
    showSearch() {
        event.preventDefault();
        this.state.callbackSearch();
    }

    render() {
        return (
            <nav className="sidebar" id="navigation">
                <a onClick={this.showSearch}><i className="fa fa-search" aria-hidden="true"></i></a>
                <a onClick={this.showPinned}><i className="fa fa-thumb-tack" aria-hidden="true"></i></a>
            </nav>
        )
    }
}

export default NavPanel;