/*
Panel
<Panel/>
*/

import React from 'react';
import $ from 'jquery';

class Panel extends React.Component {
    
    componentDidMount() {
        $('html,body').animate({
        scrollTop: $('.panel:last-child').position().top},
        'slow');
        $('.panel:last-child').css("opacity","1");
        $('.panel:last-child').css("top","0");
    }
    
}

export default Panel;