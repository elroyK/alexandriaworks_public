/*
Header
<Header/>
*/

import React from 'react';

var http = require('http');

class Header extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <h1>Alexandria.Works</h1>
            </header>
        )
    }
}

export default Header;
