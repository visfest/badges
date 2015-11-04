
var args = require('system').args;
var badge;
if(args[1]) {badge = args[1];}

var fs = require('fs'), badges, file, attendees;

if(!badge){
  file = fs.open('./data/bin/attendees.json', 'r');
  attendees = JSON.parse(file.read());
  badges = JSON.parse(fs.open('./data/badges.json', 'r').read());
}else{
  attendees = [
    { githubName: '', url: 'badges/' + badge + '/index.html', firstName: '', lastName: '' }
  ];
  badges = [];
}

// pick a random badge if an attendee does have a badge
var bid = 0;
attendees.map(function(a, i){
  if(a.url) {
  a.url = badges[bid];
  bid = ++bid % badges.length;}
});

function create_badge_url(opts){
  return 'http://localhost:8888/bin/gists/badges-github/badges/index.html#' + encodeURIComponent(JSON.stringify(opts));
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
    return { dir: "output", name: a.firstName + '-' + a.lastName }
  })
  fs.write('./data/bin/frame-dirs.json', JSON.stringify(dirs), 'w')
  phantom.exit()
}

function take_badge_pic(opts, done){
  console.log('about to open a page')

  // var url = create_badge_url(opts);
  // manually set the badge URL
  var url = 'http://localhost:8888/bin/gists/badges-github/index.html#badges/satellite/index.html';

  var page = require('webpage').create();
  var w = 1050, h = 1500
  page.clipRect = { top: 0, left: 0, width: w, height: h}
  page.viewportSize = { width: w, height: h}
    console.log('url',url)
  page.open(url, function(status){
    console.log('open page',url);
    console.log('status', status);
    console.log('evaluating');

      setTimeout(function() {
          // Initial frame
          var frame = 0;
          
          // Add an interval every 25th second
          setInterval(function() {
            
            // Render an image with the frame name
            page.evaluate(function(){ if(window.step) window.step(); });
            page.render("output/test-"+ (frame++) +".jpeg", {format: 'jpeg', quality: '100'});
            
            // Exit after 10 images
            if(frame > 9) {
              phantom.exit();
            }
          }, 215);
        }, 666);
    });
}
