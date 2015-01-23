# line-wrap

writable stream that reformats text and wraps lines to a specific line width (default 80).

also available as a command-line tool

[![NPM](https://nodei.co/npm/line-wrap.png)](https://nodei.co/npm/line-wrap/)

## installation

```js
# server/client
npm install --save line-wrap

# CLI
npm install line-wrap -g
```

## CLI usage

```bash
$ line-wrap
Usage: line-wrap <file> [-w 80] [--width=80] [-]

$ cat hello.txt
hello world

$ line-wrap hello.txt -w 2
he
ll
o 
wo
rl
d
```

## JS usage

```js
var lineWrap = require('line-wrap')
var wrapStream = lineWrap({width: 80}) // opts are optional, default is width: 80

process.stdin.pipe(wrapStream).pipe(process.stdout)
```
