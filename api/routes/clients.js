const router = require('express').Router()

const {
createClient,
getClient,
getClientById,
updateClientById,
deleteClientById
} = require('../middleware/clients')


router.route('/clients')
.post(createClient)
.get(getClient)
  
    
router.route('/clients/:id')
.get(getClientById)
.put(updateClientById)
.delete(deleteClientById)




module.exports = router