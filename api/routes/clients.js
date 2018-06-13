const router = require('express').Router()

const {
createClient,
getClient,
getClientById,
updateClientById,
deleteClientById,
getClientPaymentHistory,
getClientPaymentHistoryByOrderId
} = require('../middleware/clients')


router.route('/clients')
.post(createClient)
.get(getClient)
  
    
router.route('/clients/:id')
.get(getClientById)
.put(updateClientById)
.delete(deleteClientById)

router.route('/clients/:id/payment_history')
.get(getClientPaymentHistory)

router.route('/clients/:id/payment_history/:order_id')
.get(getClientPaymentHistoryByOrderId)




module.exports = router