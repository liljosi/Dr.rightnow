const config = require('../../config')()
const TWILIO_AUTH_TOKEN = config.get('twilio:twilio_auth_token')
const TWILIO_ACCOUNT_SID = config.get('twilio:twilio_account_sid')
const client = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
const logger = require('../../lib/logger')

module.exports = (req,res,next) => {
    let data = typeof req.body == 'string' ? JSON.parse(req.body) : req.body

    if (data.type == 'customer.created') {
        /*client.messages
        .create({
            body: 'Haz sido registrado en el sistema',
            from: '+523121949384',
            to: '+523121949384'
        })
        .then(message => console.log(message.sid))
        .done();*/
        logger.info('success creating customer')
        
    }
    res.send('ok:1')
}