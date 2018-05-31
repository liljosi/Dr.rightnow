const nconf = require('nconf')
const Path = require('path')
const debug = require('debug')('management:lib:config')
require('dotenv').config()

module.exports = function (path = Path.join(__dirname, '../', 'config')) {
  debug('loading config')
  nconf.argv().env()
  const environment = nconf.get('NODE_ENV') || 'development'
  nconf.file(environment, Path.join(path, environment.toLowerCase() + '.json'))
  nconf.file(Path.join(path, 'default.json'))
  // All secrets should be loaded here via environment variables
  // these values can be overridden in environment files.
  nconf.defaults({
    
    conekta: {
      conekta_secret_key: process.env.CONEKTA_SECRET_KEY,
      conekta_publishable_key: process.env.CONEKTA_PUBLISHABLE_KEY,
     /* webhooks: {
        'customer.created': {
          secret: process.env.STRIPE_WH_CUSTOMER_CREATED_SEC,
          template: 'welcome'
        },
        'customer.subscription.created': {
          secret: process.env.STRIPE_WH_CUSTOMER_SUBSCRIPTION_CREATED_SEC,
          template: 'subscription'
        },
        'customer.subscription.deleted': {
          secret: process.env.STRIPE_WH_CUSTOMER_SUBSCRIPTION_DELETED_SEC,
          template: 'goodbye'
        },
        'invoice.payment_failed': {
          secret: process.env.STRIPE_WH_INVOICE_PAYMENT_FAILED_SEC,
          template: 'invoice_payment_failed'
        },
        'invoice.payment_succeeded': {
          secret: process.env.STRIPE_WH_INVOICE_PAYMENT_SUCCEEDED_SEC,
          template: 'invoice_payment_succeeded'
        }
      },
      statuses: {
        ACTIVE: 'ACTIVE',
        CANCELED: 'CANCELED',
        DECLINED: 'PAYMENT_DECLINED'
      }*/
    }
  })
  return nconf
}
