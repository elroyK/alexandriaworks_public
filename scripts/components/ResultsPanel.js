/* 
ResultsPanel
<ResultsPanel/>
*/

import React from 'react';
import Panel from './Panel';
import Loader from './Loader';
import { History } from 'react-router';
import h from '../helpers';
import $ from 'jquery';
import env from '../env';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import * as d3 from "d3";
import QueryDoc from './QueryDoc';
import * as venn from "venn.js";
import tinycolor from "tinycolor2";
var http = require('http');

@autobind
class ResultsPanel extends Panel {
    
    constructor(props) {
        super(props);
        
        this.state = {
            query: this.props.query,
            callback: (this.props.displayDoc)(),
            colls: null,
            docs: null,
            topics: null,
            data: null,
            error: null,
            newData: null,
            docCount: null,
            collDonut: null,
            collDonutId: 'collectionDonut' + this.props.idkey,
            vennDiagramm: null,
            vennDiagrammId: 'vennDiagramm' + this.props.idkey,
            vennContainerId: 'vennContainer' + this.props.idkey,
            docsBackup: null
        };
        
        this.displayDoc = this.displayDoc.bind(this);
        this.processCollections = this.processCollections.bind(this);
        this.displayVennDiagramm = this.displayVennDiagramm.bind(this);
        this.displayDonut = this.displayDonut.bind(this);
    }
    
    componentWillMount() {
        this.search(this.state.query);
    }
    
    componentDidUpdate() {
        if (this.state.newData) {
            this.displayDonut(this.state.collDonut, this.state.docCount, this.state.collDonutId);
            this.displayVennDiagramm(this.state.vennDiagramm);
        }
    }

    search(query) {
        this.state.query = query;
        fetch(env.search(), {
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
                colls: response['data']['collections'],
                docs: response['data']['documents'].sort(h.compareWeight),
                docsBackup: response['data']['documents'].sort(h.compareWeight),
                topics: response['data']['topics'].sort((a,b) => {return b.targets[0].document.length - a.targets[0].document.length}),
                collDonut: this.processCollections(response['data']['collections'], response['data']['documents']),
                vennDiagramm: this.processTopics(response['data']['topics'])
            });
            this.setState({
                data: 1,
                newData: 1
            });
        }).catch(error => {
            this.setState({
                error: 1
            })
        });
    }
    
    displayDonut(colls, total, id) {
        var data = colls;
        var totalCount = total;
        var docs = this.state.docsBackup;
        
        var filter = 0;

        var width = 260;
        var height = 260;
        var thickness = 40;
        var duration = 750;

        var radius = Math.min(width, height) / 2;
        
        var maxValue = data[0].value;
        var minValue = data[data.length-1].value;
        var maxSat = 75;
        var minSat = 15;
        var maxAlpha = .85;
        var minAlpha = .05;
        
        var hue = 40;
        
        var brightness = 90;
        
        var aAlpha = (maxAlpha-minAlpha) / (maxValue-minValue);
        var bAlpha = maxAlpha - aAlpha*maxValue;
        var aSat = (maxSat-minSat) / (maxValue-minValue);
        var bSat = maxSat - aSat*maxValue;
        
        var alpha = function(i) {
            var x = data[i].value;
            var alph = aAlpha*x+bAlpha;
            return (minAlpha+maxAlpha)/2;
            return alph;
        }
        
        var saturation = function(x) {
            var sat = aSat*x+bSat;
            return sat;
        }
        
        var color = function(i) {
            var hsb = "hsv("
                +hue
                +", "
                //+maxSat
                +Math.round(saturation(data[i].value))
                +"%, "
                +brightness
                +"%)";
            var c = tinycolor(hsb);
            return c.toHexString();
        }
        
        var updateDocs = function(docs) {
            this.setState({
                docs: docs,
                newData: null
            })
        }.bind(this);
        
        var svg = d3.select("#" + id)
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);

        var g = svg.append('g')
            .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function(d) { return d.value; })
            .sort(null);

        g.append("g")
            .attr("class", "text-group")
            .append("text")
            .attr("class", "name-text")
            .text("Results")
            .attr('text-anchor', 'middle')
            .attr('dy', '-1em');
        d3.select("#"+id)
            .select(".text-group").append("text")
            .attr("class", "value-text")
            .text(totalCount)
            .attr('text-anchor', 'middle')
            .attr('dy', '.5em');
        d3.select("#"+id)
            .select(".text-group")
            .on("mouseover", function(d) {
                if(filter){
                    d3.select("#"+id)
                        .select(".text-group").select(".name-text")
                        .text("Results");

                    d3.select("#"+id)
                        .select(".text-group").select(".value-text")
                        .text(total);
                    
                    g.selectAll('path')
                        .style("fill", "#132c50")
                        .style("fill-opacity", maxAlpha);
                    
                    d3.select("#"+id)
                        .select(".text-group")
                        .style("cursor","pointer");
                }
            })
            .on("mouseout", function(d) {
                if(filter){
                    var otherPaths = g.selectAll('path');
                    var self = this;
                    otherPaths.filter((x) => {return self != this; });
                    otherPaths.each(function(d, i) {
                        if (parseInt(d.data.id) != filter) {
                            d3.select(this)
                                .style("fill", color(this._current))
                                .style("fill-opacity", alpha(this._current));
                        }
                    })
                }
        })
            .on("click", function(d) {
                var slices = g.selectAll('path');
                slices.each(function(d,i) {
                    d3.select(this)
                        .style("fill", color(this._current))
                        .style("fill-opacity", alpha(this._current));
                });

                d3.select("#"+id)
                    .select(".text-group").select(".name-text")
                    .text("Results");

                d3.select("#"+id)
                    .select(".text-group").select(".value-text")
                    .text(total);
            
                filter = null;

                var newDocs = docs;
                updateDocs(newDocs);
            });

        var path = g.selectAll('path')
            .data(pie(data))
            .enter()
            .append("g")
            .on("mouseover", function(d) {
                d3.select("#"+id)
                    .select(".text-group").select(".name-text")
                    .text(`${d.data.name}`);

                d3.select("#"+id)
                    .select(".text-group").select(".value-text")
                    .text(`${d.data.value}`);
            })
            .on("mouseout", function(d) {
                if(filter) {
                    var nD = colls.find((coll) => {return coll.id == filter});
                    d3.select("#"+id)
                        .select(".text-group").select(".name-text")
                        .text(`${nD.name}`);

                    d3.select("#"+id)
                        .select(".text-group").select(".value-text")
                        .text(`${nD.value}`);
                }
                else {
                    d3.select("#"+id)
                        .select(".text-group").select(".name-text")
                        .text("Results");

                    d3.select("#"+id)
                        .select(".text-group").select(".value-text")
                        .text(total);
                }
            })
            .on("click", function(d) {
                var newDocs = [];
                for(var i=0; i<docs.length; i++) {
                    if (docs[i]["collection-id"] == parseInt(d.data.id)) {
                        newDocs.push(docs[i]);
                    }
                }
                    
                
                updateDocs(newDocs);
                filter = parseInt(d.data.id);
                var otherPaths = g.selectAll('path');
                var self = this;
                otherPaths.filter((x) => {return self != this; });
                otherPaths.each(function(d, i) {
                    if (parseInt(d.data.id) != filter) {
                        d3.select(this)
                            .style("fill", color(this._current))
                            .style("fill-opacity", alpha(this._current));
                    }
                })
            })
            .append('path')
            .attr('d', arc)
            .attr('fill', (d,i) => color(i))
            .attr('fill-opacity', (d,i) => alpha(i))
            .on("mouseover", function(d) {
                d3.select(this)     
                    .style("cursor", "pointer")
                    .style("fill", "#132c50")
                    .style("fill-opacity", maxAlpha);
            })
            .on("mouseout", function(d) {
                if (!filter || parseInt(d.data.id) != filter) {
                    d3.select(this)
                        .style("fill", color(this._current))
                        .style("fill-opacity", alpha(this._current));
                }
                d3.select(this)
                    .style("cursor", "none")  
            })
            .each(function(d, i) { this._current = i });

    }
    
    displayVennDiagramm(data) {
        var vennDiagrammId = '#'+this.state.vennDiagrammId;
        var containerId = '#'+this.state.vennContainerId;
        var stateTopics = this.state.topics;
        
        var chart = venn.VennDiagram();
        
        d3.select(vennDiagrammId).datum(data).call(chart);
        d3.selectAll(vennDiagrammId + " .venn-circle path")
            .style("fill-opacity", .25)
            .style("fill", "#e6ac39")
            .style("stroke-width", 1)
            .style("stroke", "#07111F")
            .style("stroke-opacity",1);
        d3.selectAll(vennDiagrammId + " .venn-intersection path")
            .style("stroke-width", 0)
            .attr("visibility","hidden");
        d3.selectAll(vennDiagrammId + " text")
            .style("fill", "#07111F")
            .style("font-weight","bold")
            .style("font-size","1.2rem");
        
        // draw venn diagram
        var div = d3.select(vennDiagrammId);

        // add a tooltip
        var tooltip = d3.select("body").append("div").attr("class", "venntooltip");
        var topicName = d3.select(containerId).select("h2");

        // add listeners to all the groups to display tooltip on mouseover
        div.selectAll(".venn-circle")
            .on("mouseover", function(d, i) {
                // sort all the areas relative to the current item
                venn.sortAreas(div, d);

                // Display a tooltip with the current size
                tooltip.transition().duration(150).style("opacity", .9);
                tooltip.text(d.size + " documents");
                if(i<stateTopics.length)
                    topicName.text(stateTopics[i].description);
                else
                    topicName.text(d.sets);

                // highlight the current path
                var selection = d3.select(this).transition("tooltip").duration(400);
                selection.select("path")
                    .style("fill-opacity", d.sets.length == 1 ? .5 : .1)
        })
            .on("mouseout", function(d, i) {
                tooltip.transition().duration(400).style("opacity", 0);
                var selection = d3.select(this).transition("tooltip").duration(400);
                selection.select("path")
                    .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
                topicName.text("Topics");                
        });
    }
        
    processCollections(colls, docs) {
        let collDonut = colls;
        
        collDonut.map((collection) => {
            collection.value = 0;
        });
        
        docs.map((document) => {
            collDonut[document['collection-id'] - 1].value++;
        });
        
        let total = 0;
        collDonut.map((coll)=>total+=coll.value);
        
        this.setState({docCount: total});
        
        collDonut.sort((a,b) => {return(b.value-a.value)});
        return collDonut;
    }
    
    processTopics(topics) {
        var string="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var resultTopics = [];
        var resultAZ = [];
        var final = [];
        
        var intersect = function(a, b) {
            a.sort((x, y) => x - y);
            b.sort((x, y) => x - y);
            var ai=0, bi=0;
            var out = [];

            while( ai < a.length && bi < b.length ) {
                if (a[ai] < b[bi] )
                    ai++;
                else if (a[ai] > b[bi] )
                    bi++;
                else {
                    out.push(a[ai]);
                    ai++;
                    bi++;
                }
            }

            return out;
        };

        var loop = function (start,depth,prevData,prefix) {
            for(var i=start; i<topics.length; i++) {
                var nextAZ = prefix+string[i];
                if (prefix) 
                    var nextTopic = intersect(prevData,topics[i].targets[0].document);
                else
                    var nextTopic = topics[i].targets[0].document;
                if (depth > 0)
                    loop(i+1,depth-1,nextTopic, nextAZ);
                else {
                    resultTopics.push(nextTopic);
                    resultAZ.push(nextAZ);
                }
            }
        };

        for(var i=0; i<topics.length; i++) {
            loop(0,i,0,'');
        };
        
        for(var i=0;i<resultAZ.length; i++) {
            var sets = [];
            for(var j=0;j<resultAZ[i].length;j++)
                sets.push(resultAZ[i][j]);
            final.push({sets: sets, size: resultTopics[i].length});
        };
        
        return final;
    }
        
    displayDoc(document) {
        var trigger = this.state.callback(document.id);
    }

    render() {
        if (!this.state.data && !this.state.error) {
            return(
                <div className="panel panel_results">
                    <Loader />
                </div>
            )
        };
        
        if (this.state.data && this.state.docs.length > 0) {

            var docs = this.state.docs.map((document, i) => {
                return <QueryDoc key={document.id} doc={JSON.stringify(document)} 
                    onClick={(e) => this.displayDoc(document)} />
            });
            return(
                <div className="panel panel_results">
                   <div className="resultsContainer">
                       <h2>Results for "<span className="query">{this.state.query}</span>"</h2>
                        <ul className="queryResults">
                            {docs}
                        </ul>
                    </div>
                    <div className="diagrams">
                        <div id={this.state.collDonutId}></div>
                        <div id={this.state.vennContainerId}>
                            <div id={this.state.vennDiagrammId}></div>
                            <h2>Topics</h2>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className="panel panel_results">
                    <div className="errorContainer">
                        <h2>
                           Your query for "<span className="query">{this.state.query}</span>"
                            returned no results.
                        </h2>
                    </div>
                </div>
            )
        }
    }
}

reactMixin.onClass(ResultsPanel, History);

export default ResultsPanel;
