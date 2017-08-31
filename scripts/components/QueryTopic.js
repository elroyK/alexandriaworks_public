/*
QueryTopic
<QueryTopic/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

class QueryTopic extends React.Component {

    constructor(props) {
        super(props);
        //console.log(this.props);
        var contentArray = this.props.content.split(";",2);
        var descrArray = this.props.descr.split(";",2);
        this.state = {
            displayContent: contentArray.join(";").concat("..."),
            displayDescr: descrArray.join(";").concat("...")
        }
    }
    
    render() {
        return(
            <li className="queryTopic">
                <h3 className="topic_name"><i className="fa fa-book" aria-hidden="true"></i> {this.state.displayContent}</h3>
                <p className="topic_descr">{this.state.displayDescr}</p>
            </li>
        )
    }
    
}

export default QueryTopic;