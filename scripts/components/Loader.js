/*
Loader
<Loader/>
*/

import React from 'react';
import $ from 'jquery';

class Loader extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <svg version="1.1" id="loader" x="0px" y="0px"
                viewBox="0 0 500 500" style={{"enable-background":'new 0 0 500 500'}}>
                <path id="OB" d="M268.5,493c-10.2,0-18.5-8.3-18.5-18.5s8.3-18.5,18.5-18.5C371.9,456,456,371.9,456,268.5
                                 c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,60-23.4,116.4-65.8,158.8C384.8,469.6,328.5,493,268.5,493z">
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 250 250"
                        to="0 250 250"
                        dur="1.5s"
                        values="0 250 250;360 250 250;0 250 250"
                        repeatCount="indefinite"
                    />
                </path>
                <path id="OT" d="M25.5,250C15.3,250,7,241.7,7,231.5c0-60,23.4-116.4,65.8-158.8C115.2,30.4,171.5,7,231.5,7
                                 c10.2,0,18.5,8.3,18.5,18.5S241.7,44,231.5,44C128.1,44,44,128.1,44,231.5C44,241.7,35.7,250,25.5,250z">
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 250 250"
                        to="0 250 250"
                        dur="1.5s"
                        values="0 250 250;360 250 250;0 250 250"
                        repeatCount="indefinite"
                    />
                </path>
                <path id="IB" d="M268.5,418.2c-10.2,0-18.5-8.3-18.5-18.5s8.3-18.5,18.5-18.5c62.2,0,112.7-50.6,112.7-112.7
                                 c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5C418.2,351,351,418.2,268.5,418.2z">
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="360 250 250"
                        to="360 250 250"
                        dur="1.5s"
                        values="360 250 250;0 250 250;360 250 250"
                        repeatCount="indefinite"
                    />
                </path>
                <path id="IT" d="M100.3,250c-10.2,0-18.5-8.3-18.5-18.5C81.8,149,149,81.8,231.5,81.8c10.2,0,18.5,8.3,18.5,18.5
                                 s-8.3,18.5-18.5,18.5c-62.2,0-112.7,50.6-112.7,112.7C118.8,241.7,110.5,250,100.3,250z">
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="360 250 250"
                        to="360 250 250"
                        dur="1.5s"
                        values="360 250 250;0 250 250;360 250 250"
                        repeatCount="indefinite"
                    />
                </path>
                <path id="CB" d="M268.5,343.3c-10.2,0-18.5-8.3-18.5-18.5s8.3-18.5,18.5-18.5c20.9,0,37.9-17,37.9-37.9c0-10.2,8.3-18.5,18.5-18.5
                                 s18.5,8.3,18.5,18.5C343.3,309.7,309.7,343.3,268.5,343.3z">
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 250 250"
                        to="0 250 250"
                        dur="1.5s"
                        values="0 250 250;360 250 250;0 250 250"
                        repeatCount="indefinite"
                    />
                </path>
                <path id="CT" d="M175.2,250c-10.2,0-18.5-8.3-18.5-18.5c0-41.3,33.6-74.8,74.8-74.8c10.2,0,18.5,8.3,18.5,18.5s-8.3,18.5-18.5,18.5
                                 c-20.9,0-37.9,17-37.9,37.9C193.6,241.7,185.4,250,175.2,250z">
                    <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 250 250"
                        to="0 250 250"
                        dur="1.5s"
                        values="0 250 250;360 250 250;0 250 250"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        )
    }

}

export default Loader;