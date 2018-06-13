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
    
    
    if (data.type == 'charge.created') {
       /* client.messages
        .create({
            body: 'Se ha realizado la compra de una consulta',
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
            body: 'El pago ha sido realizado exitosamente',
            from: '+15005550006',
            to: '+10000000000'
        })
        .then(message => console.log(message.sid))
        .done()*/
        /*knex('charges').update({status:'paid'}).where(order_Id).then(() => {
            logger.info('your charge has been paid')
            logger.info('charge status updated')
        })*/
        knex('charges').update(status).where(orderID).then(() => {
            logger.info('charge payment status updated')
        })
    }
        res.send('ok:1')
}