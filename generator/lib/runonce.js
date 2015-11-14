// This runs phantom for one badge, taking a github username as the argument and generating that users badge

var fs = require('fs');
var args = require('system').args;
var github, batch;
if(args[1]) { github = args[1];}
if(args[2]) batch = true;

var frames = 10;
var frame = 0;

var file = fs.open('./data/attendees.json', 'r');
var attendees = JSON.parse(file.read());

var user;
attendees.forEach(function(a) {
  //console.log("a", a.githubName, github)
  if(a.githubName === github) {
    user = a;
    take_badge_pic(user);
  }
})

function useDesign(opts) {
  opts.delay = 1100;
  opts.frameDelay = 505;
  opts.url = 'http://bl.ocks.org/enjalot/raw/ddbbb63bde26d54f627e/'
  opts.bg = "dark" // can also be "dark"
}
function useCode(opts) {
  opts.delay = 300;
  opts.frameDelay = 660;
  opts.url = 'http://bl.ocks.org/enjalot/raw/172a233ca131431d3268/'
  opts.bg = "dark" // can also be "dark"
}
function useData(opts) {
  opts.delay = 1000;
  opts.frameDelay = 300;
  opts.url = 'http://bl.ocks.org/enjalot/raw/0610ef19ff223eef102d/'
  opts.bg = "dark" // can also be "dark"
}

function create_badge_url(opts){
  //return 'http://localhost:8888/bin/gists/badges-github/badges/index.html#' + encodeURIComponent(JSON.stringify(opts));
  return 'http://localhost:8888/layoutA.html#' + encodeURIComponent(JSON.stringify(opts));
  //return 'http://localhost:8888/layoutB.html#' + encodeURIComponent(JSON.stringify(opts));
}

function take_badge_pic(opts){
  //console.log('about to open a page', JSON.stringify(opts))

  if(opts.dadeco === "data") {
    useData(opts)
  } else if(opts.dadeco ==="code") {
    useCode(opts);
  } else {
    useDesign(opts);
  }
  if(opts.custom){
    useCustom(opts)
  }
  if(opts.images) {
    useImages(opts)
  }
  var url = create_badge_url(opts);
  var delay = opts.delay || 666;
  var frameDelay = opts.frameDelay || 215

  var page = require('webpage').create();
  var w = 1050, h = 1500
  page.clipRect = { top: 0, left: 0, width: w, height: h}
  page.viewportSize = { width: w, height: h}
  //console.log('url',url)
  page.open(url, function(status){
    //console.log('open page',url);
    console.log('status', status);

      setTimeout(function() {
          // Initial frame
          var frame = 0;
          // Add an interval every
          var interval = setInterval(function() {
            if(frame > 9) {
              console.log("done with frames", opts.githubName)
              phantom.exit();
            }
            
            // Render an image with the frame name
            page.evaluate(function(){ if(window.step) window.step(); });
            console.log("rendering frame", frame, opts.githubName)
            if(batch) {
              page.render('output/badges/' + opts.githubName + '/frame-' + frame + '.jpg', {format: 'jpg' })
            } else {
              page.render("output/frame-"+ frame +".jpg", {format: 'jpg', quality: '100'});
            }
            frame++;

            // Exit after 10 images
          }, opts.frameDelay);
        }, opts.delay);
    });
}
