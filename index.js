#!/usr/bin/env node

const retryPromise = require('@songkick/promise-retry')
const path = require('path')

module.exports = (config, args) => {
  var testModule;
  try {
    testModule = require(path.resolve(config.module))
  } catch (error) {
    return Promise.reject(new Error(`Unable to find module ${config.module}`))
  }
  const retryTenTimes = retryPromise({ retries: config.retries, delay: config.delay })
  const retryConnection = retryTenTimes(testModule(args))

  return retryConnection()
}
