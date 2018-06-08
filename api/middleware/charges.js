const knex = require('../../knex')
const logger = require('../../lib/logger')
const config = require('../../config')()
const CONEKTA_SECRET_KEY = config.get('conekta:conekta_secret_key')
const conekta = require('conekta')
conekta.api_key = CONEKTA_SECRET_KEY

Date.prototype.addHours = h => {
  this.setHours(this.getHours()+h);
  return this
}

let date = Math.floor(new Date().addHours(4)/1000)

function createChargeToOrderByOrderId (req,res,next) {
    const id = {customer_id:req.params.customer_id,id:req.params.id}
    const charged = conekta.Order.find(id.id, function(err, order) {
        order.createCharge({
            "payment_method": {
                "type": "oxxo_cash",
                "expires_at": date
            
             },
        
      }, function(err, charge) {
            
            knex('charges').insert({
                id:charge.id,
                object:charge.payment_method.object,
                status:charge.status,
                amount:charge.amount,
                fee:charge.fee,
                order_id:charge.order_id,
                payment_method:charge.payment_method.service_name,
                reference:charge.payment_method.reference
            }).then(() => {
                 res.json(charge)
             })
        })
    })
}

module.exports = {
    createChargeToOrderByOrderId
}

