const knex = require('../../knex')
const config = require('../../config')()
const CONEKTA_SECRET_KEY = config.get('conekta:conekta_secret_key')
const conekta = require('conekta')
conekta.api_key = CONEKTA_SECRET_KEY

function createChargeToOrderByOrderId (req,res,next) {
    const id = {customer_id:req.params.customer_id,id:req.params.id}
    const charged = conekta.Order.find(id.id, function(err, order) {
        order.createCharge({
            "payment_method": {
            "type": "oxxo_cash",
            "expires_at": 1527443084
            
            },
        
      }, function(err, charge) {
            console.log(JSON.stringify(charge));
            knex('charges').insert({
                id:charge.id,
                object:charge.payment_method.object,
                status:charge.status,
                fee:charge.amount,
                order_id:charge.order_id,
                payment_method:charge.payment_method.service_name,
                reference:charge.payment_method.reference
            }).then(()=>{
                res.json(charge)
            })
        })
    })
}

module.exports = {
    createChargeToOrderByOrderId
}

