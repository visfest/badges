
var fs = require('fs')
var file = fs.open('./data/bin/attendees.json', 'r')

// array of badge website urls
var badges = JSON.parse(fs.open('./data/badges.json', 'r').read())

// attendees
var attendees = JSON.parse(file.read())

// pick a random badge if an attendee does have a badge
attendees.map(function(a){
  var i = Math.floor(Math.random() * badges.length)
  a.url = badges[i]
})

function create_badge_url(opts){
  return 'http://localhost:8080/index.html#' + encodeURIComponent(JSON.stringify(opts))
}

var frames = 10
var frame = 0

// var url = 'http://www.google.com/'

// for debugging
attendees = attendees.slice(0, 4)

queue = attendees.slice()


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
  var url = create_badge_url(opts)
  var page = require('webpage').create()
  var w = 1050, h = 1500
  page.clipRect = { top: 0, left: 0, width: w, height: h}
  page.viewportSize = { width: w, height: h}
  page.open(url, function(status){
    console.log('open page')
    console.log('status', status)
    console.log('evaluating')
    function ready(){
      console.log('ready!')
      for(frame = 0; frame < frames; frame++){
        page.evaluate(function(){ if(window.step) window.step() })
        page.render("output/" + opts.firstName + '-' + opts.lastName + "/frame-"+ frame +".jpg", { format: "jpg" })
      }
      page.close()
      if(done) done()
    }
    ;(function check(){
      console.log('is_ready', is_ready)
      var is_ready = page.evaluate(function() { return window.is_ready })
      if(is_ready) ready()
      else setTimeout(check, 100)
    })()
   })
}