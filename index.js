var os = require('os')
var split = require('split2')
var through = require('through2')
var vw = require('visualwidth')
var pumpify = require('pumpify')

// algorithm in a nutshell:
// 1. get a line from input
// 2. if a line is > width then slice into head and tail
// 3. write head out, store tail
// 4. repeat, but add tail to line from input
// 5. when done, write any remaining tail out

module.exports = function(opts) {
  if (!opts) opts = { width: 80 }
  var tail = ''
  var pipeline = [
    split(),
    through.obj(function data(obj, enc, next) {
      tail = writeLines(this, obj.toString(enc), opts.width)
      next()
    }, function end(done) {
      var self = this
      writeLines(this, tail, opts.width)
    })
  ]
  return pumpify(pipeline)
}

function writeLines(out, line, width) {
  var divided = divideLine(line, width)
  divided.lines.map(function(l) {
    out.push(l + os.EOL)
  })
  if (divided.tail.length > 0) out.push(divided.tail + os.EOL)
  return divided.tail
}

function divideLine(line, width) {
  var out = {
    lines: [],
    tail: ''
  }
  var head
  while (line.length > 0) {
    head = vw.truncate(line, width, '')
    line = line.slice(head.length)
    out.lines.push(head)
    out.tail = line
  }
  return out
}
