/*
Breadcrumbs
<Breadcrumbs/>
*/

import React from 'react';
import { History } from 'react-router';

class Breadcrumbs extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="breadcrumbs">
                {this.props.query === "Favorites"
                   ? <i className="fa fa-star-o" aria-hidden="true"></i>
                   : <i className="fa fa-search" aria-hidden="true"></i>
                }
                <span className="crumb">{this.props.query}</span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
            </div>
        )
    }
};

export default Breadcrumbs;