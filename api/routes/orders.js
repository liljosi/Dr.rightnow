const router = require('express').Router()

const {
    createOrderForClient,
    getAllOrdersByClientId,
    getOrderByOrderId,
    updateOrderByOrderId
} = require('../middleware/orders')


router.route('/clients/:id/orders')
.post(createOrderForClient)
.get()

router.route('/clients/:customer_id/orders/:id')
.get(getOrderByOrderId)
.put(updateOrderByOrderId)






module.exports = router