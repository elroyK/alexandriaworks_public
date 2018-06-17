/*
App
<App/>
*/

import React from 'react';
import { History } from 'react-router';
import Header from './Header';
import NavPanel from './NavPanel';
import StoryPanel from './StoryPanel';
import SearchPanel from './SearchPanel';
import ResultsPanel from './ResultsPanel';
import DocPanel from './DocPanel';
import PinnedPanel from './PinnedPanel';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
var http = require('http');
import Cookies from 'universal-cookie';

import env from '../env';
import h from '../helpers';
import $ from 'jquery';

const cookies = new Cookies();

@autobind
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            panels:[],
            lastAddedComponent: 'search',
            docSearch: null
        };
        if (!cookies.get("favs")) cookies.set("favs","-");
        
        this.search = this.search.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.displayDoc = this.displayDoc.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }
    
    search(myQuery) {
        var tempPanels = this.state.panels;
        var tempComp = <ResultsPanel key={tempPanels.length} query={myQuery} displayDoc={() => this.displayDoc} idkey={tempPanels.length} />;
        tempPanels.push(tempComp);
        this.setState({panels: tempPanels, lastAddedComponent: 'results'});
    }
    
    componentDidUpdate() {
        $('.panel').css("opacity","1");
        $('.panel').css("top","0");
    }
    
    displayDoc(dDocId) {
        var tempPanels = this.state.panels;
        if (this.state.lastAddedComponent == 'document') {
            tempPanels.pop();
        }
        var tempComp = <DocPanel key={tempPanels.length} docId={dDocId} updateSearch={() => this.updateSearch} />;
        tempPanels.push(tempComp);
        this.setState({panels: tempPanels, lastAddedComponent: 'document'});
    }
    
    updateSearch(text) {
        this.setState({docSearch: text});
    }
    
    showPinned() {
        var tempPanels = this.state.panels;
        if (this.state.lastAddedComponent == 'pinned') {
            tempPanels.pop();
        }
        var tempComp = <PinnedPanel key={tempPanels.length} docIdCallback={() => this.displayDoc} />;
        tempPanels.push(tempComp);
        this.setState({panels: tempPanels, lastAddedComponent: 'pinned'});
    }
    
    showSearch() {
        var tempPanels = this.state.panels;
        if (this.state.lastAddedComponent == 'search') {
            if (this.state.docSearch){
                $('.panel:last-child form input').val(this.state.docSearch);
            }
            var input = $("input:text:visible:last");
            var len = input.val().length;
            input[0].focus();
            input[0].setSelectionRange(len, len);
        }
        else {
            if (this.state.docSearch)
                var tempComp = <SearchPanel key={tempPanels.length} docSearch={this.state.docSearch} search={() => this.search}/>;
            else
                var tempComp = <SearchPanel key={tempPanels.length} search={() => this.search}/>;
            tempPanels.push(tempComp);
            this.setState({panels: tempPanels, lastAddedComponent: 'search', docSearch: null});
        }
    }
    
    render() {
        
        return (
            <div id="app">
                <Header/>
                <NavPanel showPinned={() => this.showPinned} showSearch={() => this.showSearch}/>
                <div id="appContent">
                    <SearchPanel key="0" search={() => this.search}/>
                    {this.state.panels}
                </div>
                <StoryPanel/>
            </div>
        )
    }

};

reactMixin.onClass(App, History);

export default App;