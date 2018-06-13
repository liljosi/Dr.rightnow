const knex = require('../../knex')

const createDoctor = (req,res,next) => {
  let email = { email:req.body.email }
  let {id,name,phone} = req.body
  knex('doctors').select().where(email).then((response) => {
      console.log(response)
        if(response == false) {
          knex('doctors').insert({
              id:id,
              name:name,
              email:email.email,
              phone:phone,
              notifications: 'true'
          }).then(() => {
              res.send('Doctor registered successfully!')
          })
        }else{
            res.send('Doctor is already registered!')
        }
    }) 
}

const getDoctorById = (req,res,next) => {
    let {id} = req.params
    console.log(id)
    knex('doctors').select().where('id',id).then((response) => {
        res.json(response)
    })
}

const updateDoctorById = (req,res,next) => {
    let {id} = req.params
    let {name,email,phone} = req.body 
    knex('doctors').update({name:name,email:email,phone:phone})
    .where('id',id)
    .then(() => {
        res.send('Doctor with id '+id+' updated!')
    })
}

const deleteDoctorById = (req,res,next) => {
    let {id} = req.params

    knex('doctors').delete().where('id', id)
    .then(() => {
        res.send('Doctor with id: '+id+' deleted!')
    })
}

const updatePacientPaymentStatus = (req,res,next) => {
    let {chargeId} = req.params
    let {status} = req.body
    knex('charges').update({status:status}).where('id',chargeId)
    .then(() => {
        res.send('Payment Status for charge: '+chargeId+' updated')
    })
}

const stopPaymentNotifications = (req,res,next) => {
    let {id} = req.params
    let {recieveNotifications} = req.body
    knex('doctors').select('notifications').where('id',id).then((response) => {
        console.log(response)
        //condition if 
        //knex update notifications put true if false and false if true 
        if(response[0].notifications == 'true') {
            knex('doctors').update({notifications:'false'}).where('id',id).then(() => {
                res.send('Notifications turned off')
            })
        } else {
            knex('doctors').update({notifications:'true'}).where('id',id).then(() => {
                res.send('notifications turned on')
            })
        }
    })
    
}

module.exports = {
    createDoctor,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById,
    updatePacientPaymentStatus,
    stopPaymentNotifications
}
