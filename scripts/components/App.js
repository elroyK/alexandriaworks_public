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
        };
        if (!cookies.get("favs")) cookies.set("favs","-");
        
        this.search = this.search.bind(this);
        this.displayDoc = this.displayDoc.bind(this);
    }
    
    componentDidUpdate() {
        $('html,body').animate({
        scrollTop: $('.panel:last-child').position().top},
        'slow');
    }
    
    search(myQuery) {
        var tempPanels = this.state.panels;
        if (this.state.lastAddedComponent == 'results') {
            tempPanels.pop();
        }
        var tempComp = <ResultsPanel key={tempPanels.length} query={myQuery} displayDoc={() => this.displayDoc} idkey={tempPanels.length} />;
        tempPanels.push(tempComp);
        this.setState({panels: tempPanels, lastAddedComponent: 'results'});
    }
    
    displayDoc(dDocId) {
        var tempPanels = this.state.panels;
        if (this.state.lastAddedComponent == 'document') {
            tempPanels.pop();
        }
        var tempComp = <DocPanel key={tempPanels.length} docId={dDocId} />;
        tempPanels.push(tempComp);
        this.setState({panels: tempPanels, lastAddedComponent: 'document'});
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
    
    render() {
        
        return (
            <div id="app">
                <Header/>
                <NavPanel showPinned={() => this.showPinned}/>
                <div id="appContent">
                    <SearchPanel search={() => this.search}/>
                    {this.state.panels}
                </div>
                <StoryPanel/>
            </div>
        )
    }

};

reactMixin.onClass(App, History);

export default App;