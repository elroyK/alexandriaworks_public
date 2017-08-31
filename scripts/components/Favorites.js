/*
Favorites
<Favorites/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import QueryResults from './QueryResults';
import FavList from './FavList';
import DocViewer from './DocViewer';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var http = require('http');

@autobind
class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: 'Favorites',
            doc: null
        }
    }
    
    docIdCallback(document) {
        this.setState({doc: document});
    }
    
    goBack() {
        this.history.goBack();
    }

    render() {
        return (
            <div>
                <Header query={this.state.query}/>
                <div id="appContent">
                    <FavList docIdCallback={() => this.docIdCallback}/>
                    {this.state.doc
                        ? <DocViewer docId={this.state.doc.id}/>
                        : <span></span>
                    }
                </div>
                <div id="cornerLink" className="toBack">
                    <a onClick={this.goBack}>
                        <i id="cornerIcon" className="fa fa-times" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        )
    }

};

reactMixin.onClass(Favorites, History);

export default Favorites;