'use strict';

var fs = require('fs');
var args = require('system').args;
var badge = args[1] || null;
var file;
var attendees;
var MAX_FRAMES = 10;
var DEFAULT_FRAME_DELAY = 215;
var DEFAULT_START_DELAY = 666;

if (!badge) {
  file = fs.open('./attendees.json', 'r');
  attendees = JSON.parse(file.read());
} else {
  attendees = [{
    firstName: 'First',
    lastName: 'Last',
    githubName: 'handle',
    delay: 1000,
    frameDelay: 350,
    url: 'http://localhost:8888/badges/satellite/index.html',
    bg: 'light' // can also be "dark"
  }];
}

var queue = attendees.slice();

function finish_up() {
  var dirs = attendees.map(function map(a) {
    return {dir: 'output', name: a.firstName + '-' + a.lastName};
  });
  fs.write('./output/frame-dirs.json', JSON.stringify(dirs), 'w');
  phantom.exit();
}

function takeBadgePic(opts, done) {
  console.log('about to open a page', JSON.stringify(opts));
  function createBadgeUrl(opts) {
    // var layout = 'layoutA.html';
    // var layout = 'bin/gists/badges-github/badges/index.html';
    var layout = 'layoutB.html';
    var hash = encodeURIComponent(JSON.stringify(opts));
    return 'http://localhost:8888/' + layout + '#' + hash;
  }
  // var url = create_badge_url(opts);
  // manually set the badge URL
  //var url = 'http://localhost:8888/bin/gists/badges-github/index.html#badges/satellite/index.html';
  //var url = 'http://localhost:8888/layoutA.html#http://bl.ocks.org/enjalot/raw/c21840890a4790632124/'
  //var url = 'http://localhost:8888/layoutA.html#' +  opts.url; //http://bl.ocks.org/enjalot/raw/25aeeb7e41f46271db58/'
  var url = createBadgeUrl(opts);
  var delay = opts.delay || DEFAULT_START_DELAY;
  var frameDelay = opts.frameDelay || DEFAULT_FRAME_DELAY;
  var page = require('webpage').create();
  var w = 1050, h = 1500;
  page.clipRect = {top: 0, left: 0, width: w, height: h};
  page.viewportSize = {width: w, height: h};
  console.log('url', url);
  page.open(url, function(status) {
    console.log('open page', url);
    console.log('status', status);
    console.log('evaluating');
      setTimeout(function() {
        var frame = 0;
        setInterval(function() {
          // Render an image with the frame name
          page.evaluate(function(){ if(window.step) window.step(); });
          console.log('rendering frame', frame);
          var name = opts.firstName + '-' + opts.lastName;
          var outputFile = 'output/' + name + '/frame-'+ (frame++) + '.png';
          page.render(outputFile, {format: 'png', quality: '100'});
          if(frame >= MAX_FRAMES) {
            phantom.exit();
          }
        }, opts.frameDelay);
      }, opts.delay);
  });
}

(function loop() {
  if (!queue.length) {
    return finish_up();
  }
  var next = queue.pop();
  console.log('processing badge for attendee:', next.firstName);
  takeBadgePic(next, loop);
}());
