const config = require('../../config')()
const TWILIO_AUTH_TOKEN = config.get('twilio:twilio_auth_token')
const TWILIO_ACCOUNT_SID = config.get('twilio:twilio_account_sid')
const TWILIO_ACCOUNT_TEST_SID = config.get('twilio:twilio_test_account_sid')
const TWILIO_TEST_AUTH_TOKEN = config.get('twilio:twilio_test_auth_token')
const client = require('twilio')(TWILIO_ACCOUNT_TEST_SID,TWILIO_TEST_AUTH_TOKEN)
const logger = require('../../lib/logger')
const knex = require('../../knex')

module.exports = (req,res,next) => {
    let data = typeof req.body == 'string' ? JSON.parse(req.body) : req.body
    let orderId = data.data.object.order_id

    knex('charges').select('reference').where('order_id',orderId).then((response) => {
        if (data.type == 'charge.created') {
            /* client.messages
             .create({
                 body: 'Se ha realizado la compra de una consulta, puede pagar en su Oxxo más cercano con la siguiente referencia: '+response[0].reference,
                 from: '+15005550006',
                 to: '+10000000000'
             })
             .then(message => console.log(message.sid))
             .done()*/
             logger.info('charge created')
         }
         else if (data.type == 'charge.paid') {
             logger.info(JSON.stringify(data))
             let orderID = { order_id: data.data.object.order_id }
             const status = { status: data.data.object.status }
     
             /*client.messages
             .create({
                 body: 'El pago ha sido realizado exitosamente para la orden: '+data.data.object.order_id,
                 from: '+15005550006',
                 to: '+10000000000'
             })
             .then(message => console.log(message.sid))
             .done()*/
     
             knex('charges').update(status).where(orderID).then(() => {
                 logger.info('charge payment status updated')
             })
         }
    })
        res.send('ok:1')
}