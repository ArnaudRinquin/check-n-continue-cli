# check-n-continue-cli

[![Build Status](https://travis-ci.org/ArnaudRinquin/check-n-continue-cli.svg?branch=master)](https://travis-ci.org/ArnaudRinquin/check-n-continue-cli)

A simple cli tool that exits successfully only after a test routine passes or fails after a configurable number of retries.

_Disclaimer_: I quickly published this as I wanted to ship it before 2017, I'll document it properly in the coming days.

Uses cases:

* wait for a DB instance to be accessible before running migrations

* make sure an API is available before start a service

## Usage

```
check-n-continue -m|--module <path to the test module> [-d|--delay <delay between retries in ms, 3000>] [-r|--retries <number of retries, 20> [-v|--versbose]
```

Example:

```sh
check-n-continue -m test/testDBconnection.js && npm run migrations
```

The only mandatory argument is the path to the test module, which is of the form:

```js

// export a function that receives args from minimist
module.exports = function configureTester(args) {
  // return a function that will be called many time
  return function test() {
    // always return a promise
    return Promise.resolve('always pass');
  }
}
```
