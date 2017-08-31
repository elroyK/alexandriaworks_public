/*
Header
<Header/>
*/

import React from 'react';
import Breadcrumbs from './Breadcrumbs';

class Header extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="top">
                <img src="/build/css/images/agvespa.svg" id="app_logo"/>
                <Breadcrumbs query={this.props.query}/>
            </header>
        )
    }
}

export default Header;
