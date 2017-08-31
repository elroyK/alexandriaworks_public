let helpers =  {
    jParse(response) {  
        return response.json();
    },

    dateConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var day = a.getDate();
        var date = day + '-' + month + '-' + year;
        return date;
    },
    
    starBounce() {
        // Thanks to velopert for this codepen : https://codepen.io/velopert/pen/PzoWpE
        
        var element = document.getElementById("cornerIcon");
        
        element.classList.toggle("bounce");
        window.setTimeout(function(){element.classList.toggle("bounce")}, 1000);
    }
}

export default helpers;