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
            callback: (this.props.showPinned)()
        }
        
        this.showPinned = this.showPinned.bind(this);
    }
    
    showPinned() {
        event.preventDefault();
        this.state.callback();
    }

    render() {
        return (
            <nav className="sidebar" id="navigation">
                <a onClick={this.showPinned}><i className="fa fa-thumb-tack" aria-hidden="true"></i></a>
            </nav>
        )
    }
}

export default NavPanel;