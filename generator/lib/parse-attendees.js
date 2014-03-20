
// node.js script (check the makefile for how this is run)

var csv = require('csv')
var fs = require('fs')

var rows = []
csv().from.stream(fs.createReadStream(__dirname + '/../data/tito-visfest-d3unconf-tickets-all-for-info-visfest-com_.csv'), {columns: true, encoding: 'utf16le'})
  .on('record', function(row, i){
    // we only need a these few fields
    var gh = row['What is your GitHub handle?']
    if(gh === '-') gh = ''
    var attendee = {
        githubName: gh
      , firstName: row['Ticket First Name'] || row['Order Name'].split(/\s+/)[0]
      , lastName: row['Ticket Last Name'] || row['Order Name'].split(/\s+/).slice(1).join(' ')
      , email: row['Ticket Email']
    }
    add_special_url(attendee)
    rows.push(attendee)
  }).on('end', function(){
    console.log(JSON.stringify(rows))
  })


function add_special_url(attendee){
  // for people who made their own badge
  var gh = attendee.githubName, url
  if(gh === 'enjalot') url = 'badges/b28/index.html'
  if(gh === 'gelicia') url = 'badges/b9/index.html'
  if(gh === 'vicapow') url = 'badges/b6/index.html'
  if(gh === 'ptvans')  url = 'badges/b10/index.html'
  if(gh === 'alignedleft') url = 'badges/b11/index.html'
  if(gh === 'visnup') url = 'badges/b16/index.html'
  if(url) attendee.url = url
}