/*
App
<App/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import QueryResults from './QueryResults';
import Favorites from './Favorites';
import DocViewer from './DocViewer';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var http = require('http');

@autobind
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.location.state,
            doc: null
        }
    }
    
    docIdCallback(document) {
        this.setState({doc: document});
    }
    
    goToFav() {
        this.history.pushState('Favorites', '/fav');
    }

    render() {
        return (
            <div>
                <Header query={this.state.query}/>
                <div id="appContent">
                    {this.state.query === "Favorites"
                        ? <Favorites docIdCallback={() => this.docIdCallback}/>
                        : <QueryResults query={this.state.query} docIdCallback={() => this.docIdCallback}/>
                    }
                    {this.state.doc
                        ? <DocViewer docId={this.state.doc.id}/>
                        : <span></span>
                    }
                </div>
                <div id="cornerLink" className="toFavs">
                    <a onClick={this.goToFav}>
                        <i id="cornerIcon" className="fa fa-star" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        )
    }

};

reactMixin.onClass(App, History);

export default App;
