#!/usr/bin/env node

var fs = require('fs')
var wrap = require('./')
var args = require('minimist')(process.argv.slice(2))

var width = args.w || args.width || 80
var stdin = args._[args._.length - 1] === '-'
var noArgs = args._.length === 0
var firstArg = args._[0]

if (noArgs) {
  console.error('Usage: line-wrap <file> [-w 80] [--width=80] [-]')
  process.exit(1)
}

var wrapper = wrap({width: width})

if (stdin) process.stdin.pipe(wrapper).pipe(process.stdout)
else fs.createReadStream(firstArg).pipe(wrapper).pipe(process.stdout)
