
var args = require('system').args;
var badge;
if(args[1]) {badge = args[1];}

var fs = require('fs'), badges, file, attendees;

var batch = false;

if(!badge){
  file = fs.open('./data/attendees.json', 'r');
  attendees = JSON.parse(file.read());
  batch = true;

  //badges = JSON.parse(fs.open('./data/badges.json', 'r').read());
}else{
  /*
  attendees = [
    { githubName: '', url: 'badges/' + badge + '/index.html', firstName: '', lastName: '' }
  ];
  */
  /*
  var opts = {
      firstName: 'Elijah'
    , lastName: 'Meeks'
    , githubName: 'emeeks'
    , delay: 1000
    , frameDelay: 500
    , url: 'http://bl.ocks.org/enjalot/raw/25aeeb7e41f46271db58/'
    , bg: "light" // can also be "dark"
  }
  */
  /*
  var opts = {
      firstName: 'Kenneth'
    , lastName: 'Izzo'
    , githubName: 'k-izzo'
    , delay: 3000
    , frameDelay: 500
    , url: 'http://bl.ocks.org/saraquigley/raw/56ede2f899c8a63fc1d5/'
    , bg: "light"
  }
  */
  /*
  var opts = {
      firstName: 'Siu-Mei'
    , lastName: 'Man'
    , githubName: 'siumei'
    , delay: 700
    , frameDelay: 420
    , url: 'http://localhost:8888/badges/siumei/index.html'
    , bg: "light" // can also be "dark"
  }
  */
  /*
  var opts = {
      firstName: 'Mike'
    , lastName: 'Bostock'
    , githubName: 'mbostock'
    , delay: 800
    , frameDelay: 180
    //, url: 'http://localhost:8888/badges/poisson/index.html'
    , url: 'http://localhost:8888/badges/spiral/index.html'
    , bg: "light" // can also be "dark"
  }
  */
  /*
  var opts = {
      firstName: 'Ken'
    , lastName: 'Penn'
    , githubName: 'kenpenn'
    , delay: 500
    , frameDelay: 250
    , url: 'http://localhost:8888/badges/kenpenn/index.html'
    , bg: "dark" // can also be "dark"
  }
  */
  var opts = {
      firstName: 'Ian'
    , lastName: 'Johnson'
    , githubName: 'enjalot'
    , dadeco: "code"
  }
  //useDesign(opts)
  //useCode(opts)
  //useData(opts)

  attendees = [ opts ]
  badges = [];
}

function useDesign(opts) {
  opts.delay = 1000;
  opts.frameDelay = 500;
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
// pick a random badge if an attendee does have a badge
/*
var bid = 0;
attendees.map(function(a, i){
  if(a.url) {
  a.url = badges[bid];
  bid = ++bid % badges.length;}
});
*/

function create_badge_url(opts){
  //return 'http://localhost:8888/bin/gists/badges-github/badges/index.html#' + encodeURIComponent(JSON.stringify(opts));
  return 'http://localhost:8888/layoutA.html#' + encodeURIComponent(JSON.stringify(opts));
  //return 'http://localhost:8888/layoutB.html#' + encodeURIComponent(JSON.stringify(opts));
}

var frames = 10;
var frame = 0;

// for debugging
// attendees = attendees.slice(0, 5);

queue = attendees.slice();


;(function loop(){
  if(!queue.length) return finish_up()
  var next = queue.pop()
  console.log('processing badge for attendee:', next.firstName)
  take_badge_pic(next, loop)
})()

function finish_up(){
  var dirs = attendees.map(function(a){
    //return { dir: "output", name: a.firstName + '-' + a.lastName }
    return { dir: "output", name: a.github }
  })
  fs.write('./data/frame-dirs.json', JSON.stringify(dirs), 'w')
  phantom.exit()
}

function take_badge_pic(opts, done){
  //console.log('about to open a page', JSON.stringify(opts))

  if(opts.dadeco === "data") {
    useData(opts)
  } else if(opts.dadeco ==="code") {
    useCode(opts);
  } else {
    useDesign(opts);
  }

  // var url = create_badge_url(opts);
  // manually set the badge URL
  //var url = 'http://localhost:8888/bin/gists/badges-github/index.html#badges/satellite/index.html';
  //var url = 'http://localhost:8888/layoutA.html#http://bl.ocks.org/enjalot/raw/c21840890a4790632124/'
  //var url = 'http://localhost:8888/layoutA.html#' +  opts.url; //http://bl.ocks.org/enjalot/raw/25aeeb7e41f46271db58/'
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
          
          // Add an interval every 25th second
          var interval = setInterval(function() {
            if(frame > 10) {
              //phantom.exit();
              //clearInterval(thisInterval)
              console.log("done with frames", opts.githubName)
              clearInterval(interval);
              return done();
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
