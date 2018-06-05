/*
PinnedPanel
<PinnedPanel/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import h from '../helpers';
import FavDoc from './FavDoc';
import Cookies from 'universal-cookie';
import env from '../env';

const cookies = new Cookies();

class PinnedPanel extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            docs: [],
            callback: (this.props.docIdCallback)(),
            favs: cookies.get("favs"),
            data: null,
        };
        
        this.displayDoc = this.displayDoc.bind(this); 
        this.refreshFavs = this.refreshFavs.bind(this); 
        this.fetchDoc = this.fetchDoc.bind(this); 
        this.fetchDocs = this.fetchDocs.bind(this); 
    }
    
    componentWillMount() {
        this.fetchDocs();
    }
    
    fetchDocs() {
        var favArray = this.state.favs.split("-");
        favArray.shift();
        favArray.pop();
        favArray.forEach((fav) => {
            this.fetchDoc(parseInt(fav));
        });
        this.setState({
            data: 1
        });
    }
    
    fetchDoc(docId) {
        fetch(env.document(), {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qid: 'doc-' + (new Date).getTime(),
                id: docId
            })
        }).then(response => response.json())
          .then(response => {
            this.setState( (prevState) => {
                return {
                    docs : prevState.docs.concat(response['data'])
                };
            });
        });
    }
        
    displayDoc(document) {
        var trigger = this.state.callback(document.id);
    }
    
    refreshFavs() {
        this.setState({
            favs: cookies.get("favs"),
        }, this.forceUpdate());
    }
    
    isFav(id) {
        if (!cookies.get("favs")) return false;
        var favString = cookies.get("favs");
        var buffer = "-" + id + "-";
        return (favString.indexOf(buffer) !== -1);
    } 

    render() {
        if (!this.state.data) {
            return(
                <div className="panel panel_pinned">
                    <img src="/build/css/images/loading.gif" className="loadingGif" />
                </div>
            )
        };
        
        var docs = this.state.docs.map((document) => {
            if (this.isFav(document.id)) {
                return <FavDoc key={document.id} doc={JSON.stringify(document)} display={(e) => this.displayDoc(document)} update={() => this.refreshFavs(document.id)}/>
            }
        });

        return(
            <div className="panel panel_pinned">
                <ul className="queryResults">
                    {docs}
                </ul>
            </div>
        )
    }

}

export default PinnedPanel;