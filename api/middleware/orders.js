const knex = require('../../knex')
const logger = require('../../lib/logger')
const config = require('../../config')()
const CONEKTA_SECRET_KEY = config.get('conekta:conekta_secret_key')
const conekta = require('conekta')
conekta.api_key = CONEKTA_SECRET_KEY


function createOrderForClient (req,res,next) {
    const id ={
        id:req.params.id
    }
   const order= conekta.Order.create({
       "currency": "MXN",
       "customer_info": {
         "customer_id": id.id
       },
       "line_items": [{
         "name": "Consulta médica",
         "unit_price": 35000,
         "quantity": 1
       }],
       "shipping_lines": [{
           "amount": 1500,
           "carrier": "mi compania"
       }],
       "shipping_contact": {
           "phone": "8181818181",
           "address": {
               "city": "Cuahutemoc",
               "residential": true,
               "street1": "Calle 123 int 2 Col. Chida",
               "state": "Ciudad de Mexico",
               "postal_code": "06100",
               "country": "MX"
           },
           "receiver": "Bruce Wayne"
       },
      
       
     }, function(err, order) {
         logger.info(JSON.stringify(order))
         logger.info(order._json.object)
        
        knex('orders').insert({
            id:order._id,
            object:order._json.object,
            currency:order._json.currency,
            amount:order._json.amount,
            customer_id:order._json.customer_info.customer_id,
            created_at:order._json.created_at,
            updated_at:order._json.updated_at
        }).then(()=>{res.send('Order created for client with id:'+id.id)})
     })
}

function getAllOrdersByClientId (req,res,next) {
    const id = {customer_id:req.params.id}
    knex('orders').select().where(id).then((orders)=>{
        res.json(orders)
    })
}

function getOrderByOrderId (req,res,next) {
    const id = {customer_id:req.params.customer_id,id:req.params.id}
    knex('orders').select().where(id).then((order)=>{res.json(order)})
}

function updateOrderByOrderId (req,res,next) {
    const id = {customer_id:req.params.customer_id,id:req.params.id}
    let currency = req.body.currency
    conekta.Order.find(id.id, function(err, order) {
        order.update({
          "currency": currency
        }, function(err, response) {
          logger.info(JSON.stringify(response));
          res.send('Order with id: '+id.id +' updated')
        
        });
    });
}

module.exports = {
    createOrderForClient,
    getAllOrdersByClientId,
    getOrderByOrderId,
    updateOrderByOrderId
}