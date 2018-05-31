const router = require('express').Router()

const {
    createChargeToOrderByOrderId
} = require('../middleware/charges')





router.route('/clients/:customer_id/orders/:id/charges')
.post(createChargeToOrderByOrderId)



module.exports = router