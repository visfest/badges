fs = require('fs');
file = fs.readFileSync('./data/attendees.json');
attendees = JSON.parse(file.toString());


var spawn = require('child_process').spawn
  , fs = require('fs')

function phantom(name, done) {
  var ph = spawn('phantomjs', [
    'lib/runonce.js', name, 'true' ])
  ph.stdout.pipe(process.stdout)
  ph.stderr.pipe(process.stderr)
  ph.on('close', done)
  ph.on('error', done)
}
function gif(name, done){
  var dir = 'output/badges'
  var convert = spawn('convert', [
    '-loop', '0', dir + '/' + name + '/frame-*.jpg', dir + '/' + name + '.gif' ])
  convert.stdout.pipe(process.stdout)
  convert.stderr.pipe(process.stderr)
  convert.on('close', done)
  convert.on('error', done)
}

;(function process(err){
  if(err) throw err
  var next = attendees.pop()
  console.log("next", next)
  console.log('creating gif for ' + next.githubName)
  setTimeout(function() {
    phantom(next.githubName, function(err){
      if(err) throw err
      gif(next.githubName, process)
    })
  }, 500)
})()