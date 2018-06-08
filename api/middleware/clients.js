const knex = require('../../knex')
const bcrypt = require('bcrypt')
const conekta = require('conekta')
const logger = require('../../lib/logger')
const config = require('../../config')()
const CONEKTA_SECRET_KEY = config.get('conekta:conekta_secret_key')
conekta.api_key = CONEKTA_SECRET_KEY

function createClient(req,res,next) {
    var password = req.body.password
    var saltRounds = 10
    logger.info(password)
   var client =  conekta.Customer.create({
        name: 'Manuel Topeta',
        email: 'usuario@example.com',
        phone: '+5215555555555',
       
       
    }, function(err, customer) {
             logger.info(JSON.stringify(customer));
             logger.info('client created')
            bcrypt.hash(password,saltRounds, function(err,hash){
                knex('clients').insert({
                    id:customer._id,
                    name: customer._json.name,
                    email: customer._json.email,
                    phone: customer._json.phone,
                    password:hash
                }).then(()=>{res.send('client created')})
            })
    })
   
}

function getClient (req,res,next) {
    knex('clients').select().then((clients)=>{
        res.json(clients)
    })
}

function getClientById (req,res,next) {
    const id ={
        id : req.params.id
    } 
    logger.info(id.id)
    knex('clients').select().where( id).then((client)=>{
        res.json(client)
    })
}

function updateClientById (req,res,next) {
    const id = {id:req.params.id}
    const name = req.body.name
    const email = req.body.email
    const updated= conekta.Customer.find(id.id, function(err, customer) {
            customer.update({
            name: name,
            email: email
            }, function(err, user) {
                logger.info(JSON.stringify(user));
                knex('clients').update({
                    id:customer._id,
                    name: user._json.name,
                    email: user._json.email,
                    
            
                }).where(id).then(()=>{res.send('client updated')})
            })
      })
}

function deleteClientById (req,res,next) {
    const id ={id:req.params.id}
    const eliminated = conekta.Customer.find(id.id, function(err, customer) {
        customer.delete(function(err, response) {
          knex('clients').delete().where(id).then(()=>{
              res.send('Se eliminó el cliente con id:'+id.id)
          })
        })
      })
}

module.exports = {
    createClient,
    getClient,
    getClientById,
    updateClientById,
    deleteClientById
}