// console.log("Generate gif");
// var phantom = require('phantom');
// var frames = 20;

// var page = require('webpage').create();

// page.clipRect = { top: 0, left: 0, width: 900, height: 800};
// page.viewportSize = { width: 900, height: 800};

var url = 'http://localhost:8080/index.html#badges/b3/index.html';

var frames = 10
var frame = 0
console.log('Loading a web page')
var page = require('webpage').create()

var w = 1050, h = 1500
page.clipRect = { top: 0, left: 0, width: w, height: h}
page.viewportSize = { width: w, height: h}

// var url = 'http://www.google.com/'

console.log('about to open page')
page.open(url, function(status){
  console.log('open page')
  console.log('status', status)
  console.log('evaluating')
  function ready(){
    console.log('ready!')
    for(frame = 0; frame < frames; frame++){
      page.evaluate(function(){ if(window.step) window.step() })
      page.render("output/test-"+ frame +".png", { format: "png" })
    }
    phantom.exit()
  }
  ;(function check(){
    console.log('is_ready', is_ready)
    var is_ready = page.evaluate(function() { return window.is_ready })
    if(is_ready) ready()
    else setTimeout(check, 100)
  })()
 })
