

// convert -loop 0 output/test-*.png test.gif
var spawn = require('child_process').spawn
  , fs = require('fs')

function convert(dir, done){
  var convert = spawn('convert', [
    '-loop', '0', dir + '/frame-*.jpg', dir + '/badge.gif' ])
  convert.on('close', done)
  convert.on('error', done)
}

var dirs = JSON.parse(fs.readFileSync('./data/bin/frame-dirs.json'))

;(function process(err){
  if(err) throw err
  if(!frameDirs.length) return
  var next = frameDirs.pop()
  console.log('creating gif for ' + next)
  conver(next, process)
})()