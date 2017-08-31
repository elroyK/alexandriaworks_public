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
import $ from 'jquery';

class DocViewer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            docId: this.props.docId,
            docName: null,
            docDate: null,
            nextId: null,
            prevId: null,
            content: null,
            data: null
        }
        this.getPrev = this.getPrev.bind(this);
        this.getNext = this.getNext.bind(this);
    }
    
    componentWillMount() {
        this.fetchDoc(this.state.docId);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: null
        },this.fetchDoc(nextProps.docId));
    }
    
    fetchDoc(docId) {
        fetch('//API-ADDRESS/api/document', {
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
            this.setState({
                docId: docId,
                docName: response['filename'],
                docDate: this.convertDate(response['date-added']),
                nextId: response['next'] ? response['next'] : null,
                prevId: response['previous'] ? response['previous'] : null,
                content: response['content'],
                data: 1
        })}, function(error) {
            console.log("Booh") //=> String
        });
    }
    
    fetchContent(id, isNext) {
        fetch('http://35.188.97.126:55610/api/document', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qid: 'doc-' + (new Date).getTime(),
                id: id
            })
        }).then(response => response.json())
          .then(response => {
            if (isNext) {
                this.setState({
                    nextId: response['next'] ? response['next'] : null,
                    content: this.state.content + response['content'],
                });
            } else {
                this.setState({
                    prevId: response['previous'] ? response['previous'] : null,
                    content: response['content'] + this.state.content,
                });
            }
            return response['content'];
        }, function(error) {
            console.log("Booh") //=> String
        });
    }
    
    checkScroll() {
        var sBtm = document.getElementById("docvw").scrollTop + document.getElement("docvw").clientHeight;
        var sHyt = document.getElementById("docvw").scrollHeight;
        var ratio = sBtm / sHyt;
        if (ratio >= .9) return true;
        else return false;
    }
    
    convertDate(date) {
        var initArray = date.split(" ");
        var wDate = initArray[0];
        var wArray = wDate.split("-");
        var fDate = wArray[2] + "-" + wArray[1] + "-" + wArray[0];
        return fDate;
    }
    
    docScroll() {
        var scrollBottom = document.getElementById("docvw").scrollTop + document.getElementById("docvw").offsetHeight;
        var scrollHeight = document.getElementById("docvw").scrollHeight;
        var scrollPercentage = scrollBottom / scrollHeight;
        if (scrollPercentage >= 0.9) {
            //console.log("trigger");
        }
    }
    
    hasPrev() {
        if (this.state.prevId) return true;
        else return false;
    }
    
    hasNext() {
        if (this.state.nextId) return true;
        else return false;
    }
    
    getPrev() {
        this.fetchContent(this.state.prevId, false)
    }
    
    getNext() {
        this.fetchContent(this.state.nextId, true);
    }
    
    render() {
        
        if (!this.state.data) {
            return (
                 <img src="/build/css/images/loading.gif" className="loadingGif" />
            )
        }
        
        return(
            <div id="docvw" onScroll={this.docScroll}>
                <h2 id="docvw_title">{this.state.docName}</h2>
                <div className="docvw_meta">
                    <span id="docvw_date">
                        {this.state.docDate}
                    </span>
                </div>
                {this.hasPrev() &&
                    <div id="docvw_showPrev">
                        <a onClick={this.getPrev}>
                            <i id="upArrow" className="docArrow fa fa-angle-double-up" aria-hidden="true"></i>
                        </a>
                    </div>
                }
                <div id="docvw_content">
                    {this.state.content}
                </div>
                {this.hasNext() &&
                    <div id="docvw_showNext">
                        <a onClick={this.getNext}>
                            <i id="downArrow" className="docArrow fa fa-angle-double-down" aria-hidden="true"></i>
                        </a>
                    </div>
                }
            </div>
        )
    }
    
};

export default DocViewer;