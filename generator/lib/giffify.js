// convert -loop 0 output/test-*.png test.gif
var spawn = require('child_process').spawn
  , fs = require('fs')

function convert(dir, name, done){
  var convert = spawn('convert', [
    '-loop', '0', dir + '/' + name + '/frame-*.jpg', dir + '/' + name + '.gif' ])
  convert.stdout.pipe(process.stdout)
  convert.stderr.pipe(process.stderr)
  convert.on('close', done)
  convert.on('error', done)
}

function create_thumb(dir, name, done){
  var args = [ dir + '/' + name + '.gif', '-resize', '100', dir + '/' + name + '-small.gif']
  console.log('using command', args.join(' '))
  var convert = spawn('convert', args)
  convert.stdout.pipe(process.stdout)
  convert.stderr.pipe(process.stderr)
  convert.on('close', done)
  convert.on('error', done)
}

//var dirs = JSON.parse(fs.readFileSync('./data/bin/frame-dirs.json'))
var dir = 'output/badges'
var dirs = fs.readdirSync(dir)
console.log("DIRS", dirs)

;(function process(err){
  if(err) throw err
  if(!dirs.length) return
  var next = dirs.pop()
  if(next === ".DS_Store") next = dirs.pop();
  if(next.indexOf(".gif") >= 0) next = dirs.pop();
  console.log("next", next)
  console.log('creating gif for ' + dir + '/' + next)
  convert(dir, next, function(err){
    if(err) throw err
    create_thumb(dir,next, process)
  })
})()