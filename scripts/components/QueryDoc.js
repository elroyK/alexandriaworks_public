/*
QueryDoc
<QueryDoc/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class QueryDoc extends React.Component {

    constructor(props) {
        super(props);
        var doc = JSON.parse(this.props.doc);
        this.state = {
            doc: doc,
            liId: 'doc' + doc.id,
            key: doc.id
        }
        this.fav = this.fav.bind(this);
        this.isFav = this.isFav.bind(this);
    }
    
    fav() {
        if (cookies.get("favs")) {
            var favs = cookies.get("favs");
            if (this.isFav()) {
                var buffer = "-" + this.state.key.toString() + "-";
                var newFav = favs.replace(buffer,"-")
                cookies.set("favs", newFav, {path: '/'})
            } else {
                cookies.set("favs", favs + this.state.key.toString() + "-", {path: '/'});
            }
        } else {
            var dId = this.state.key.toString();
            cookies.set("favs", "-" + dId + "-", {path: '/'});
        }
        h.starBounce();
        this.forceUpdate();
    }
    
    isFav() {
        if (!cookies.get("favs")) return false;
        var favString = cookies.get("favs");
        var buffer = "-" + this.state.key.toString() + "-";
        return (favString.indexOf(buffer) !== -1);
    }
    
    render() {
        
        return(
            <li className="queryDoc" id={this.state.liId}>
               <a onClick={this.props.onClick}>
                    <h3><i className="fa fa-file-text" aria-hidden="true"></i> {this.state.doc.filename}</h3>
                    <p className="doc_meta">
                        <span className="doc_date">
                            <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
                            {h.dateConverter(this.state.doc['date-added'])}
                        </span>
                        <span className="doc_collec">
                            <i className="fa fa-folder-open" aria-hidden="true"></i>&nbsp;
                            {this.state.doc.collName}
                        </span>
                    </p>
                    <div className="doc_snippet">
                        <i className="fa fa-quote-right" aria-hidden="true"></i>
                        <p>
                            {this.state.doc.snippet}
                        </p>
                    </div>
                    <p className="doc_meta">
                        <span className="doc_uri">
                            <i className="fa fa-link" aria-hidden="true"></i>&nbsp;
                            {this.state.doc.uri}
                        </span>
                    </p>
                </a>
                <a onClick={this.fav} className="favLink">
                    {this.isFav() ? (
                        <i className="fa fa-star" aria-hidden="true"></i>
                    ) : (
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                    )}
                </a>
            </li>
        )
    }
    
}

export default QueryDoc;