const logger = require('winston')
const config = require('../config')()
logger.add(logger.transports.File, config.get('log:file'))
module.exports = logger