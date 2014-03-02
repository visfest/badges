// console.log("Generate gif");
// var phantom = require('phantom');
// var frames = 20;

// var page = require('webpage').create();

// page.clipRect = { top: 0, left: 0, width: 900, height: 800};
// page.viewportSize = { width: 900, height: 800};

// var url = 'http://dl.dropbox.com/u/621993/voronoi/voronoi.html';

var frames = 10;
console.log('Loading a web page');
var page = require('webpage').create();

page.clipRect = { top: 0, left: 0, width: 900, height: 800};
page.viewportSize = { width: 900, height: 800};

var url = 'http://www.google.de/';
page.open(url, function(){
    console.log("Hello");
    setInterval(function(){
        

        document.body.style.background = "red";
        page.render("gif/test-"+frames+".jpg", { format: "jpg" });

        if( frames === 0 ){
            phantom.exit();
        }

        frames--;

     }, 100);
 });