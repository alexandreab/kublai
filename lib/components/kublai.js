// kublai
// https://github.com/topfreegames/kublai
//
// Licensed under the MIT license:
// http://www.opensource.org/licenses/mit-license
// Copyright © 2016 Top Free Games <backend@tfgco.com>

const utils = require('pomelo/lib/util/utils')
const KublaiService = require('../services/kublai.js')
const errors = require('./../errors')

const Component = function (app, opts) {
  if (!opts.khanUrl) {
    throw new errors.KhanError('Could not load kublai since no khan url was specified...')
  }
  const timeout = opts.timeout || 500
  const maxSockets = opts.maxSockets || 50
  const logger = opts.logger
  this.app = app
  this.app.set(
    'kublai',
    new KublaiService(opts.khanUrl, timeout, maxSockets, logger, this.app, this))
}

Component.prototype.start = (cb) => {
  utils.invokeCallback(cb)
}

module.exports = function (app, opts) {
  return new Component(app, opts)
}
