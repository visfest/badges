
// node.js script (check the makefile for how this is run)

var csv = require('csv')
var fs = require('fs')

var rows = []
csv().from.stream(fs.createReadStream(__dirname + '/../data/tito-visfest-d3unconf-tickets-all-for-info-visfest-com_.csv'), {columns: true, encoding: 'utf16le'})
  .on('record', function(row, i){
    // we only need a these few fields
    var gh = row['What is your GitHub handle?']
    if(gh === '-') gh = ''
    rows.push({
        githubName: gh
      , firstName: row['Ticket First Name'] || row['Order Name'].split(/\s+/)[0]
      , lastName: row['Ticket Last Name'] || row['Order Name'].split(/\s+/).slice(1).join(' ')
      , email: row['Ticket Email']
    })
  }).on('end', function(){
    console.log(JSON.stringify(rows))
  })