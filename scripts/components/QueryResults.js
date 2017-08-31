/*
QueryResults
<QueryResults/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import QueryTopic from './QueryTopic';
import QueryDoc from './QueryDoc';

class QueryResults extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            query: this.props.query,
            colls: null,
            docs: null,
            topics: null,
            callback: (this.props.docIdCallback)(),
            data: null
        };
        
        this.displayDoc = this.displayDoc.bind(this) 
    }
    
    componentWillMount() {
        this.fetchResults(this.state.query);
    }
    
    fetchResults(query) {
        fetch('//API-ADDRESS/api/search', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qid: 'search-' + (new Date).getTime(),
                'target-type': [ 'document', 'topic' ],
                filters: { collection: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ] },
                content: query
            })
        }).then(response => response.json())
          .then(response => {
            this.setState({
                colls: response['collections'],
                docs: response['documents'],
                topics: response['topics']
            });
            var ind,len,docColl,collec;
            for (ind=0, len=this.state.docs.length; ind<len; ind++){
                docColl = this.state.docs[ind].collection - 1;
                this.state.docs[ind].collName = this.state.colls[docColl].name;
            };
            this.setState({
                data: 1
            });
        }, function(error) {
            console.log("Booh") //=> String
        });
    }
        
    displayDoc(document) {
        //console.log(document);
        var trigger = this.state.callback(document);
    }

    render() {
        if (!this.state.data) {
            return(
                <img src="/build/css/images/loading.gif" className="loadingGif" />
            )
        };
        
        var tops = this.state.topics.map(function(topic, index) {
            return <QueryTopic key={index} descr={topic.description} content={topic.content}/>
        });
        var docs = this.state.docs.map((document) => {
            return <QueryDoc key={document.id} doc={JSON.stringify(document)} onClick={(e) => this.displayDoc(document)}/>
        });

        return(
            <ul className="queryResults">
                {tops}
                {docs}
            </ul>
        )
    }

}

export default QueryResults;