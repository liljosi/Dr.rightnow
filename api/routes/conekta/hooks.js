const chargeHook = require('../../middleware/invoice.charge')
const customerHook = require('../../middleware/invoice.customer')
const router = require('express').Router()

router.route('/invoice_charge')
.post(chargeHook)

router.route('/invoice_customer')
.post(customerHook)

module.exports = router