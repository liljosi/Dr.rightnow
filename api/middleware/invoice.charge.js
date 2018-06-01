const config = require('../../config')()
const TWILIO_AUTH_TOKEN = config.get('twilio:twilio_auth_token')
const TWILIO_ACCOUNT_SID = config.get('twilio:twilio_account_sid')
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
const logger = require('../../lib/logger')

module.exports = (req,res,next) => {
    let data = typeof req.body == 'string' ? JSON.parse(req.body) : req.body;

    if (data.type == 'charge.created') {
        /*client.messages
        .create({
            body: 'Se ha realizado la compra de una consulta',
            from: '+523121949384',
            to: '+523121949384'
        })
        .then(message => console.log(message.sid))
        .done();*/
        logger.info('charge created')
    }
    else if (data.type == 'charge.paid') {
       /* client.messages
        .create({
            body: 'El pago ha sido verificado con éxito',
            from: '+523121949384',
            to: '+523121949384'
        })
        .then(message => console.log(message.sid))
        .done();*/
        logger.info('your charge has been paid')
    }
        res.send('ok:1')
}